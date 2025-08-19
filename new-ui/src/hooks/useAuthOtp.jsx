import { useEffect, useState } from "react";
import { sendOtpApi, verifyOtpApi, checkValidSession } from "../services/api";

export default function useAuthOtp({ chatbotId, authMethod }) {
  const [identifier, setIdentifier] = useState(""); // email or phone based on authMethod
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // restore session
  useEffect(() => {
    (async () => {
      const savedType = localStorage.getItem("chatbot_auth_type");
      const savedId = localStorage.getItem("chatbot_user_id");
      if (!savedType || !savedId) return;

      try {
        const q = savedType === "whatsapp" ? { phone: savedId } : { email: savedId };
        const { data } = await checkValidSession({ ...q, chatbotId });
        if (data?.isValid) {
          setIdentifier(savedId);
          setSessionId(data.sessionId);
          setIsVerified(true);
          setOtpSent(true);
        } else {
          localStorage.removeItem("chatbot_auth_type");
          localStorage.removeItem("chatbot_user_id");
        }
      } catch {/* ignore */}
    })();
  }, [chatbotId]);

  const sendOtp = async () => {
    setLoadingOtp(true);
    try {
      const payload = authMethod === "email" ? { email: identifier } : { phone: identifier };
      await sendOtpApi(payload);
      setOtpSent(true);
      return true;
    } finally {
      setLoadingOtp(false);
    }
  };

  const verifyOtp = async (otp) => {
    setLoadingVerify(true);
    try {
      const payload = authMethod === "email"
        ? { email: identifier, otp, chatbotId }
        : { phone: identifier, otp, chatbotId };

      const resp = await verifyOtpApi(payload);
      const sid = resp?.data?.sessionId;
      if (!sid) throw new Error("No sessionId returned");
      setSessionId(sid);
      setIsVerified(true);
      localStorage.setItem("chatbot_auth_type", authMethod === "email" ? "email" : "whatsapp");
      localStorage.setItem("chatbot_user_id", identifier);
      return true;
    } finally {
      setLoadingVerify(false);
    }
  };

  return {
    identifier, setIdentifier,
    otpSent, setOtpSent,
    loadingOtp, loadingVerify,
    isVerified, sessionId,
    sendOtp, verifyOtp,
  };
}
