import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import type { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4 opacity-80">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
            <span className="text-4xl">👋</span>
          </div>
          <p className="text-center font-medium">How can I assist with your dining experience today?</p>
        </div>
      )}
      
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      
      {isLoading && (
        <div className="flex justify-start my-2 animate-pulse">
          <div className="bg-white/10 border border-white/10 backdrop-blur-md text-white rounded-2xl rounded-tl-sm px-5 py-4 flex items-center space-x-2 shadow-lg">
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
      
      <div ref={endOfMessagesRef} />
    </div>
  );
};
