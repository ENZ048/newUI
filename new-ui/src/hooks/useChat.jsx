import { useState, useEffect, useCallback } from "react";
import { chatbotApi } from "../services/api";
import { toast } from "react-toastify";

export const useChat = (chatbotId, email, sessionId, isVerified) => {
  // --- STATE MANAGEMENT ---
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [animatedMessageIdx, setAnimatedMessageIdx] = useState(null);

  // --- INITIAL WELCOME MESSAGE ---
  useEffect(() => {
    // Only set the initial message if the user is verified and there's no history yet
    if (isVerified && chatHistory.length === 0) {
      setChatHistory([
        {
          sender: "bot",
          text: `Hello! I'm Supa Agent. How can I assist you today?`,
        },
      ]);
    }
  }, [isVerified]); // This effect runs only when verification status changes

  // --- HANDLERS ---
  const handleSendMessage = useCallback(
    async (text) => {
      const textToSend = text || message;
      if (!textToSend.trim() || !isVerified) return;

      setUserHasInteracted(true);
      const userMessage = { sender: "user", text: textToSend };
      setChatHistory((prev) => [...prev, userMessage]);
      setMessage("");
      setIsTyping(true);

      try {
        const res = await chatbotApi(textToSend, chatbotId, email, sessionId);
        const botMessage = {
          sender: "bot",
          text: res.data.answer || "Sorry, I couldn't get that.",
          // audio: res.data.audio, // You can re-add this when you implement TTS
        };
        setChatHistory((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Chat API error:", error);
        toast.error("Failed to get a response from the server.");
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Something went wrong. Please try again later.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [message, isVerified, chatbotId, email, sessionId]
  ); // Dependencies for the function

  // --- RETURN VALUE ---
  return {
    chatHistory,
    setChatHistory,
    message,
    setMessage,
    isTyping,
    userHasInteracted,
    animatedMessageIdx,
    setAnimatedMessageIdx,
    handleSendMessage,
  };
};