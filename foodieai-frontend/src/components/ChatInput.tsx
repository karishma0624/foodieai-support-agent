import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  isListening: boolean;
  toggleListening: () => void;
  isMicSupported: boolean;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  isListening, 
  toggleListening, 
  isMicSupported,
  isLoading 
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="p-4 bg-white/5 border-t border-white/10">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        {isMicSupported && (
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-full transition-all duration-300 shadow-md ${
              isListening 
                ? 'bg-red-500/80 text-white animate-pulse border border-red-400/50' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
            title="Toggle Voice Input"
          >
            🎤
          </button>
        )}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isListening ? "Listening..." : "Ask FoodieAI..."}
          className="flex-1 px-4 py-3 bg-white/10 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white placeholder-gray-300 backdrop-blur-md transition-all"
          disabled={isLoading || isListening}
        />
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-medium rounded-full shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Send
        </button>
      </form>
    </div>
  );
};
