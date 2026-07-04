import { useState, useCallback } from "react";

export function useSpeechSynthesis() {
  const [isMuted, setIsMuted] = useState(false);

  const speak = useCallback((text: string) => {
    if (isMuted) return;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted(prev => !prev);

  return { isMuted, toggleMute, speak };
}
