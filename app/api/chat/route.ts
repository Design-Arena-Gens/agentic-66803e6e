import { NextResponse } from 'next/server';
import { generateAgentResponse, type ChatMessage, createSystemPrompt } from '@/lib/agent';

export async function POST(request: Request) {
  const body = await request.json().catch(() => undefined);

  if (!body || !Array.isArray(body.history)) {
    return NextResponse.json(
      { error: 'Invalid request payload. Expected { history: ChatMessage[] }.' },
      { status: 400 }
    );
  }

  const history = body.history as ChatMessage[];

  if (!history.length) {
    return NextResponse.json({ message: createSystemPrompt() });
  }

  const message = generateAgentResponse(history);

  return NextResponse.json({ message });
}
