'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatBubble } from './ChatBubble';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatPanel() {
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm McAssistant. Ask me about menu items, combos, deals, or nutrition facts and I'll get you sorted."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function sendMessage(message: string) {
    const payload = [...history, { role: 'user' as const, content: message }];
    setHistory((prev) => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ history: payload })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to fetch response');
      }

      setHistory((prev) => [...prev, { role: 'assistant', content: data.message as string }]);
    } catch (error) {
      const fallback =
        error instanceof Error ? error.message : 'Something went wrong. Please try again shortly.';
      setHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Oops! ${fallback}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setInput('');
    void sendMessage(trimmed);
  }

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [history]);

  return (
    <div className="flex h-full flex-col rounded-3xl border border-mcdonalds-yellow/20 bg-white shadow-xl">
      <div className="flex items-center justify-between gap-3 border-b border-mcdonalds-yellow/40 bg-mcdonalds-yellow/30 px-6 py-4">
        <div>
          <p className="text-lg font-semibold text-mcdonalds-red">McAssistant</p>
          <p className="text-xs text-mcdonalds-dark/70">Ready to help 24/7 with crave-worthy answers.</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mcdonalds-red text-white font-semibold">
          AI
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {history.map((message, index) => (
          <ChatBubble key={`${message.role}-${index}`} role={message.role} content={message.content} />
        ))}
        {isLoading ? (
          <div className="text-xs text-mcdonalds-dark/70">The crew is preparing your answer...</div>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-mcdonalds-yellow/40 px-6 py-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about menu items, combos, deals, or nutrition..."
            className="flex-1 rounded-full border border-mcdonalds-yellow/60 bg-white px-4 py-3 text-sm focus:border-mcdonalds-red focus:outline-none focus:ring-2 focus:ring-mcdonalds-red/40"
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full bg-mcdonalds-red px-6 py-3 text-sm font-semibold text-white shadow disabled:cursor-not-allowed disabled:bg-mcdonalds-red/60"
          >
            {isLoading ? 'Sending…' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
