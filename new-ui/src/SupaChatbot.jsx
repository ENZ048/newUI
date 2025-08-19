import React, { useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// Custom Hooks
import { useAuth } from "./hooks/useAuth";
import { useChat } from "./hooks/useChat";
import { useVoice } from "./hooks/useVoice";

// API Services
import { getChatbotConfigApi, sendEnquiryApi } from "./services/api";

// Styled Components (assuming they are in a single file or imported as needed)
import { Wrapper, Overlay, Chatbox } from "./components/styled";

// UI Components
import FloatingButton from "./components/layout/FloatingButton";
import Header from "./components/layout/Header";
import VoiceOverlay from "./components/voice/VoiceOverlay";
import EmailInputStep from "./components/auth/EmailInputStep";
import PhoneInputStep from "./components/auth/PhoneInputStep";
import OtpVerificationStep from "./components/auth/OtpVerificationStep";
import ChatWindow from "./components/chat/ChatWindow";

const SupaChatbot = ({ botAvatar, botName, chatbotId }) => {
  // --- STATE MANAGEMENT ---
  const [config, setConfig] = useState(null);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryData, setEnquiryData] = useState({ name: "", phone: "", message: "" });
  const scrollRef = useRef();

  // --- HOOKS ---
  const auth = useAuth(chatbotId);
  const chat = useChat(chatbotId, auth.sessionId, config, auth.isVerified, auth.identifier);
  const voice = useVoice(chat.handleSendMessage);

  // --- EFFECTS ---
  // Fetch the client-specific configuration when the chatbot loads
  useEffect(() => {
    const fetchConfig = async () => {
      if (!chatbotId) {
        setIsLoadingConfig(false);
        return;
      }
      try {
        const fetchedConfig = await getChatbotConfigApi(chatbotId);
        setConfig(fetchedConfig);
      } catch (error) {
        console.error("Failed to load chatbot config:", error);
        // Set a default config or show an error state if needed
      } finally {
        setIsLoadingConfig(false);
      }
    };
    fetchConfig();
  }, [chatbotId]);

  // Auto-scroll the chat window when new messages are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.chatHistory, chat.isTyping, showEnquiryForm]);

  // --- HANDLERS ---
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 500); // Duration must match your CSS animation
  };

  const handleSubmitEnquiry = async () => {
    // Use the verified identifier from the auth hook
    const identifier = auth.email ? { email: auth.email } : { phone: auth.phone };
    await sendEnquiryApi({ ...enquiryData, ...identifier });
    setShowEnquiryForm(false);
    setEnquiryData({ name: "", phone: "", message: "" });
    chat.setChatHistory(prev => [...prev, { sender: 'bot', text: 'Thanks! Your enquiry has been submitted.' }]);
  };

  // --- DYNAMIC RENDERING LOGIC ---
  const renderAuthFlow = () => {
    const identifier = config?.auth_method === 'email' ? { email: auth.email } : { phone: auth.phone };

    if (!auth.otpSent) {
      // Render the correct input step based on the fetched config
      if (config?.auth_method === 'whatsapp') {
        return <PhoneInputStep phone={auth.phone} setPhone={auth.setPhone} handleSendOtp={auth.handleSendOtp} loadingOtp={auth.loadingOtp} />;
      }
      // Default to email
      return <EmailInputStep email={auth.email} setEmail={auth.setEmail} handleSendOtp={auth.handleSendOtp} loadingOtp={auth.loadingOtp} />;
    } else {
      // The OTP verification step is the same for both methods
      return <OtpVerificationStep otp={auth.otp} setOtp={auth.setOtp} handleVerifyOtp={() => auth.handleVerifyOtp(identifier)} loadingVerify={auth.loadingVerify} />;
    }
  };

  const renderContent = () => {
    // Show a loader while fetching config or checking session
    if (isLoadingConfig || auth.isCheckingSession) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><ClipLoader color="#a855f7" /></div>;
    }

    // If not verified, show the authentication flow
    if (!auth.isVerified) {
      return renderAuthFlow();
    }

    // Once verified, show the main chat window
    return (
      <ChatWindow
        {...chat}
        {...voice}
        showEnquiryForm={showEnquiryForm}
        setShowEnquiryForm={setShowEnquiryForm}
        enquiryData={enquiryData}
        setEnquiryData={setEnquiryData}
        handleSubmitEnquiry={handleSubmitEnquiry}
      />
    );
  };

  // --- MAIN COMPONENT JSX ---
  return (
    <Wrapper>
      {!isOpen && <FloatingButton onClick={() => setIsOpen(true)} />}
      {isOpen && (
        <Overlay>
          <Chatbox className={isClosing ? "closing" : ""} ref={scrollRef}>
            <Header
              botAvatar={botAvatar}
              botName={botName}
              online={!isLoadingConfig}
              onClose={handleClose}
            />
            {renderContent()}
          </Chatbox>
        </Overlay>
      )}
      <VoiceOverlay
        botName={botName}
        isRecording={voice.isRecording}
        stopRecording={voice.stopRecording}
      />
    </Wrapper>
  );
};

export default SupaChatbot;