import React, { useState, useEffect, useRef } from "react";
import { Wrapper, Overlay, Chatbox } from "./components/styled"; // Import styled components
import {
  chatbotApi,
  sendOtpApi,
  verifyOtpApi,
  sendEnquiryApi,
  checkValidSession,
} from "./services/api";
import EmailInputStep from "./components/auth/EmailInputStep";
import OtpVerificationStep from "./components/auth/OtpVerificationStep";
import ChatWindow from "./components/chat/ChatWindow";
import FloatingButton from "./components/layout/FloatingButton";
import Header from "./components/layout/Header";
import VoiceOverlay from "./components/voice/VoiceOverlay";
import { toast } from "react-toastify";

const SupaChatbot = ({ botAvatar, botName, chatbotId }) => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // New state for closing animation
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [animatedMessageIdx, setAnimatedMessageIdx] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const scrollRef = useRef();

  // Effects
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const checkAndRestoreSession = async () => {
      const savedEmail = localStorage.getItem("chatbot_user_email");

      

      if (!savedEmail) {
        setIsCheckingSession(false);
        return;
      }

      try {
        console.log("Saved Email : ", savedEmail);
        console.log("ChatboID : ", chatbotId);
        const response = await checkValidSession(savedEmail, chatbotId);

        if (response.data && response.data.isValid) {
          // Success case remains the same
          setEmail(savedEmail);
          setSessionId(response.data.sessionId);
          setChatHistory([
            {
              sender: "bot",
              text: `Welcome back, ${savedEmail}! How can I help?`,
            },
          ]);
        } else {
          // Add info toast for an expired or invalid session
          localStorage.removeItem("chatbot_user_email");
          toast.info("Your session has expired. Please sign in again.");
        }
      } catch (error) {
        // Add error toast for network or server errors
        console.error("Session check failed:", error);
        localStorage.removeItem("chatbot_user_email");
        toast.error("Could not restore your session. Please sign in.");
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkAndRestoreSession();
  }, [chatbotId]);

  useEffect(() => {
    if (otpSent && resendTimeout > 0) {
      const timer = setInterval(
        () => setResendTimeout((prev) => prev - 1),
        1000
      );
      return () => clearInterval(timer);
    }
  }, [otpSent, resendTimeout]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping, showEnquiryForm]);

  // Handlers
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 500); // Duration should match the slideOut animation in styled.jsx
  };

  const handleSendOtp = async () => {
    if (!isEmailValid) return;
    setLoadingOtp(true);
    try {
      await sendOtpApi(email);
      setOtpSent(true);
      setResendTimeout(30);
      setSessionId(crypto.randomUUID());
      toast.success("OTP sent to your Email!");
      setIsVerified(true);
      setTimeout(() => {
        setChatHistory([
          { sender: "bot", text: `Hi, how can I help you today?` },
        ]);
      }, 4000);
    } finally {
      setLoadingOtp(false);
      toast.error('Failed to send otp!')
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    setLoadingVerify(true);
    try {
      await verifyOtpApi(email, otp, chatbotId);

      // 2. Set verified to true to trigger the animation
      setIsVerified(true);

      // 3. Wait for the animation to finish, then transition to chat
      setTimeout(() => {
        setChatHistory([
          { sender: "bot", text: `Hi ${email}, how can I help you today?` },
        ]);
      }, 4000); // 4 seconds, matching the animation's fade-out delay
    } catch (error) {
      toast.error(error);
      setIsVerified(false); // Ensure it's false on error
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleSendMessage = async (msg = message) => {
    if (!msg.trim()) return;

    setUserHasInteracted(true);
    setChatHistory((prev) => [...prev, { sender: "user", text: msg }]);
    setMessage("");
    setIsTyping(true);

    try {
      // Pass all required arguments to the API call
      const res = await chatbotApi(msg, chatbotId, email, sessionId);
      setChatHistory((prev) => [...prev, { sender: "bot", text: res.data }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmitEnquiry = async () => {
    await sendEnquiryApi({ ...enquiryData, email });
    setShowEnquiryForm(false);
    setEnquiryData({ name: "", phone: "", message: "" });
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Voice recording stubs (replace with your actual logic)
  const handleMicClick = () => setIsRecording(!isRecording);
  const handleMicTouchStart = () => setIsRecording(true);
  const handleMicTouchEnd = () => setIsRecording(false);
  const handleMicMouseDown = () => setIsRecording(true);
  const handleMicMouseUp = () => setIsRecording(false);
  const stopRecording = () => setIsRecording(false);

  // Suggestions
  const suggestions = [
    { label: "Tell me about your services", icon: "💡", bg: "#fef3c7" },
    { label: "What are your working hours?", icon: "⏰", bg: "#e0f2fe" },
    { label: "Contact support", icon: "📞", bg: "#dcfce7" },
  ];

  return (
    <Wrapper>
      {!isOpen && <FloatingButton onClick={() => setIsOpen(true)} />}

      {isOpen && (
        <Overlay>
          <Chatbox className={isClosing ? "closing" : ""}>
            <Header
              botAvatar={botAvatar}
              botName={botName}
              online={true}
              onClose={handleClose}
            />

            {!otpSent ? (
              <EmailInputStep
                email={email}
                setEmail={setEmail}
                isEmailValid={isEmailValid}
                setIsEmailValid={setIsEmailValid}
                handleSendOtp={handleSendOtp}
                loadingOtp={loadingOtp}
              />
            ) : chatHistory.length === 0 ? (
              <OtpVerificationStep
                otp={otp}
                setOtp={setOtp}
                email={email}
                setOtpSent={setOtpSent}
                handleVerifyOtp={handleVerifyOtp}
                loadingVerify={loadingVerify}
                resendTimeout={resendTimeout}
                handleSendOtp={handleSendOtp}
                isVerified={isVerified}
              />
            ) : (
              <ChatWindow
                chatHistory={chatHistory}
                isTyping={isTyping}
                animatedMessageIdx={animatedMessageIdx}
                setAnimatedMessageIdx={setAnimatedMessageIdx}
                suggestions={suggestions}
                handleSendMessage={handleSendMessage}
                userHasInteracted={userHasInteracted}
                showEnquiryForm={showEnquiryForm}
                setShowEnquiryForm={setShowEnquiryForm}
                enquiryData={enquiryData}
                setEnquiryData={setEnquiryData}
                email={email}
                handleSubmitEnquiry={handleSubmitEnquiry}
                scrollToBottom={scrollToBottom}
                message={message}
                setMessage={setMessage}
                isMobile={isMobile}
                isRecording={isRecording}
                handleMicClick={handleMicClick}
                handleMicTouchStart={handleMicTouchStart}
                handleMicTouchEnd={handleMicTouchEnd}
                handleMicMouseDown={handleMicMouseDown}
                handleMicMouseUp={handleMicMouseUp}
              />
            )}
            <div ref={scrollRef} />
          </Chatbox>
        </Overlay>
      )}

      <VoiceOverlay
        botName={botName}
        isRecording={isRecording}
        isMobile={isMobile}
        stopRecording={stopRecording}
      />
    </Wrapper>
  );
};

export default SupaChatbot;
