import { useEffect, useState } from "react";
import { getClientConfig } from "../services/api";

export default function useClientConfig(chatbotId) {
  const [authMethod, setAuthMethod] = useState("email");
  const [freeMessages, setFreeMessages] = useState(1);
  const [uiSuggestions, setUiSuggestions] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await getClientConfig(chatbotId);
        if (!mounted) return;
        setAuthMethod(data?.auth_method || "email");
        setFreeMessages(Number.isFinite(data?.free_messages) ? data.free_messages : 1);
        setUiSuggestions(Array.isArray(data?.ui_suggestions) ? data.ui_suggestions : []);
      } catch {
        // keep defaults
      }
    })();
    return () => { mounted = false; };
  }, [chatbotId]);

  return { authMethod, freeMessages, uiSuggestions };
}
