import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div 
        className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-lg backdrop-blur-md border ${
          isUser 
            ? 'bg-orange-500/90 text-white rounded-tr-sm border-orange-400/50' 
            : 'bg-white/15 text-white rounded-tl-sm border-white/20'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};
