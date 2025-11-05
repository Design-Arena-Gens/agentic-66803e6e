import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'McAssistant AI Agent',
  description: 'Conversational AI assistant for McDonald\'s guests to explore menu, deals, and orders.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-mcdonalds-dark">
        {children}
      </body>
    </html>
  );
}
