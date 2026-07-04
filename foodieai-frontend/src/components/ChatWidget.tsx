import React, { useState, useEffect } from 'react';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { getOrCreateSessionId } from '../lib/session';
import { sendMessage, fetchChatHistory } from '../lib/api';
import type { Message } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const { isMuted, toggleMute, speak } = useSpeechSynthesis();

  useEffect(() => {
    const initSession = async () => {
      const sid = getOrCreateSessionId();
      setSessionId(sid);
      try {
        const history = await fetchChatHistory(sid);
        if (history && history.length > 0) {
          const formattedHistory = history.map((h: any) => ({
            role: h.role,
            content: h.content
          }));
          setMessages(formattedHistory);
        }
      } catch (e) {
        console.error("Failed to load history", e);
      }
    };
    initSession();
  }, []);

  const handleSend = async (text: string) => {
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const replyText = await sendMessage(sessionId, text);
      const assistantMsg: Message = { role: 'assistant', content: replyText };
      setMessages(prev => [...prev, assistantMsg]);
      speak(replyText);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting to the server." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const { isListening, isSupported: isMicSupported, toggleListening } = useSpeechRecognition((transcript) => {
    handleSend(transcript);
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-2xl shadow-orange-500/50 flex items-center justify-center text-3xl hover:scale-105 transition-transform"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[600px] max-h-[80vh] flex flex-col bg-gray-900/90 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10">
          
          <div className="bg-orange-600 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                🥘
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">FoodieAI</h3>
                <p className="text-orange-100 text-xs">Always here to help</p>
              </div>
            </div>
            <button 
              onClick={toggleMute}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
              title={isMuted ? "Unmute Voice" : "Mute Voice"}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>

          <ChatWindow messages={messages} isLoading={isLoading} />

          <ChatInput 
            onSend={handleSend} 
            isListening={isListening} 
            toggleListening={toggleListening} 
            isMicSupported={isMicSupported}
            isLoading={isLoading} 
          />
        </div>
      )}
    </div>
  );
};
