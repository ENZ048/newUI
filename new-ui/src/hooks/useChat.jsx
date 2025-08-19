import { useState } from "react";
import { chatbotApi } from "../services/api";

export default function useChat({ chatbotId, sessionId, authMethod, identifier }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setChatHistory((p) => [...p, { sender: "user", text }]);
    setIsTyping(true);
    try {
      const res = await chatbotApi({
        query: text,
        chatbotId,
        sessionId,
        email: authMethod === "email" ? identifier : undefined,
        phone: authMethod === "whatsapp" ? identifier : undefined,
      });
      const reply = typeof res.data === "string" ? res.data : res.data?.answer || "";
      setChatHistory((p) => [...p, { sender: "bot", text: reply }]);
    } finally {
      setIsTyping(false);
    }
  };

  return { chatHistory, isTyping, sendMessage, setChatHistory };
}
