import React, { useRef, useState } from "react";
import { Wrapper, Overlay, Chatbox } from "./components/styled";
import Header from "./components/layout/Header";
import FloatingButton from "./components/layout/FloatingButton";
import EmailInputStep from "./components/auth/EmailInputStep";
import OtpVerificationStep from "./components/auth/OtpVerificationStep";
import ChatWindow from "./components/chat/ChatWindow";
import VoiceOverlay from "./components/voice/VoiceOverlay";
import useClientConfig from "./hooks/useClientConfig";
import useAuthOtp from "./hooks/useAuthOtp";
import useResendTimer from "./hooks/useResendTimer";
import useChat from "./hooks/useChat";
import useDevice from "./hooks/useDevice";

const SupaChatbot = ({ botAvatar, botName, chatbotId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { authMethod, freeMessages, uiSuggestions } = useClientConfig(chatbotId);

  const {
    identifier, setIdentifier,
    otpSent, setOtpSent,
    loadingOtp, loadingVerify,
    isVerified, sessionId,
    sendOtp, verifyOtp,
  } = useAuthOtp({ chatbotId, authMethod });

  const { resendTimeout, setResendTimeout } = useResendTimer(0);
  const { chatHistory, isTyping, sendMessage, setChatHistory } =
    useChat({ chatbotId, sessionId, authMethod, identifier });

  const { isMobile, isRecording, toggleMic, startMic, stopMic } = useDevice();
  const [message, setMessage] = useState("");
  const scrollRef = useRef();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => { setIsOpen(false); setIsClosing(false); }, 500);
  };

  return (
    <Wrapper>
      {!isOpen && <FloatingButton onClick={() => setIsOpen(true)} />}

      {isOpen && (
        <Overlay>
          <Chatbox className={isClosing ? "closing" : ""}>
            <Header botAvatar={botAvatar} botName={botName} online onClose={handleClose} />

            {!otpSent ? (
              <EmailInputStep
                // if whatsapp, reuse your phone input component here
                email={identifier}
                setEmail={setIdentifier}
                isEmailValid={true} // or your validator
                setIsEmailValid={() => {}}
                loadingOtp={loadingOtp}
                handleSendOtp={async () => { const ok = await sendOtp(); if (ok) setResendTimeout(30); }}
                helperText={authMethod === "email" ? "Enter your email" : "Enter your WhatsApp number"}
              />
            ) : chatHistory.length === 0 ? (
              <OtpVerificationStep
                email={identifier}
                otpRefocusOnError
                otp=""
                setOtp={() => {}}
                isVerified={isVerified}
                loadingVerify={loadingVerify}
                resendTimeout={resendTimeout}
                handleSendOtp={async () => { const ok = await sendOtp(); if (ok) setResendTimeout(30); }}
                handleVerifyOtp={async (otp) => {
                  const ok = await verifyOtp(otp);
                  if (ok) setTimeout(() => {
                    setChatHistory([{ sender: "bot", text: `Hi ${identifier}, how can I help?` }]);
                  }, 4000);
                }}
                setOtpSent={setOtpSent}
              />
            ) : (
              <ChatWindow
                chatHistory={chatHistory}
                isTyping={isTyping}
                suggestions={(uiSuggestions?.length ? uiSuggestions : [
                  { label: "Tell me about your services", icon: "💡", bg: "#fef3c7" },
                  { label: "What are your working hours?", icon: "⏰", bg: "#e0f2fe" },
                  { label: "Contact support", icon: "📞", bg: "#dcfce7" },
                ])}
                handleSendMessage={(text) => sendMessage(text || message)}
                message={message}
                setMessage={setMessage}
                isMobile={isMobile}
                isRecording={isRecording}
                handleMicClick={toggleMic}
                handleMicMouseDown={startMic}
                handleMicMouseUp={stopMic}
                handleMicTouchStart={startMic}
                handleMicTouchEnd={stopMic}
              />
            )}

            <div ref={scrollRef} />
          </Chatbox>
        </Overlay>
      )}

      <VoiceOverlay botName={botName} isRecording={isRecording} isMobile={isMobile} stopRecording={stopMic} />
    </Wrapper>
  );
};

export default SupaChatbot;
