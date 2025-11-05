'use client';

import clsx from 'clsx';

export type ChatBubbleProps = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === 'user';
  return (
    <div
      className={clsx('flex w-full', {
        'justify-end': isUser,
        'justify-start': !isUser
      })}
    >
      <div
        className={clsx(
          'max-w-[80%] rounded-3xl px-5 py-4 text-sm shadow-md transition-all',
          {
            'bg-mcdonalds-red text-white': isUser,
            'bg-white text-mcdonalds-dark border border-mcdonalds-yellow': !isUser
          }
        )}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {content}
      </div>
    </div>
  );
}
