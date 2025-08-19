import { useState, useEffect } from "react";
import { requestOtpApi, verifyOtpApi, checkValidSession } from "../services/api";
import { toast } from "react-toastify";

const SESSION_STORAGE_KEY = "chatbot_user_session";

export const useAuth = (chatbotId) => {
  // --- STATE MANAGEMENT ---
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // --- EFFECTS ---
  useEffect(() => {
    const checkAndRestoreSession = async () => {
      const savedSessionJSON = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!savedSessionJSON) {
        setIsCheckingSession(false);
        return;
      }

      try {
        const { identifier } = JSON.parse(savedSessionJSON);
        const response = await checkValidSession(identifier, chatbotId);

        if (response && response.isValid) {
          if (identifier.email) setEmail(identifier.email);
          if (identifier.phone) setPhone(identifier.phone);
          setSessionId(response.sessionId);
          setIsVerified(true);
          setOtpSent(true);
        } else {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        localStorage.removeItem(SESSION_STORAGE_KEY);
      } finally {
        setIsCheckingSession(false);
      }
    };
    if (chatbotId) checkAndRestoreSession();
  }, [chatbotId]);


  // --- HANDLERS ---
  const handleSendOtp = async (identifier) => {
    setLoadingOtp(true);
    try {
      await requestOtpApi(identifier);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP.");
      console.log(error)
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleVerifyOtp = async (identifier) => {
    if (otp.length !== 6) return toast.error("Please enter the 6-digit code.");
    setLoadingVerify(true);
    try {
      const res = await verifyOtpApi(identifier, otp, chatbotId);
      if (res.data.success) {
        setSessionId(res.data.sessionId);
        setIsVerified(true);
        // Save the verified session to localStorage
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ identifier }));
      } else {
        throw new Error(res.data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      setIsVerified(false);
      console.log(error)
    } finally {
      setLoadingVerify(false);
    }
  };

  return {
    email, setEmail, phone, setPhone, otp, setOtp,
    isVerified, sessionId, otpSent, setOtpSent,
    loadingOtp, loadingVerify, isCheckingSession,
    handleSendOtp, handleVerifyOtp,
  };
};