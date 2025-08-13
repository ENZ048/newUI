import React from "react";
// Import VoiceMobileInstructions from your styled components file
import {
  ChatContainer,
  MessagesContainer,
  TypingBubble,
  InputContainer,
  ChatInput,
  SendButton,
  VoiceMobileInstructions, // Added this import
} from "../styled";
import MessageItem from "./MessageBubble";
import SuggestionsList from "./SuggestionsList";
import EnquiryForm from "./EnquiryForm";
import { IoSend } from "react-icons/io5";
import { FiMic, FiSquare } from "react-icons/fi";
import VoiceButton from "../voice/VoiceButton";

const ChatWindow = ({
  chatHistory,
  isTyping,
  animatedMessageIdx,
  setAnimatedMessageIdx,
  suggestions,
  handleSendMessage,
  userHasInteracted,
  showEnquiryForm,
  setShowEnquiryForm,
  enquiryData,
  setEnquiryData,
  email,
  handleSubmitEnquiry,
  scrollToBottom,
  message,
  setMessage,
  isMobile,
  isRecording,
  handleMicClick,
  handleMicTouchStart,
  handleMicTouchEnd,
  handleMicMouseDown,
  handleMicMouseUp,
}) => {
  return (
    <ChatContainer>
      <MessagesContainer>
        {chatHistory.map((msg, idx) => (
          <MessageItem
            key={idx}
            msg={msg}
            idx={idx}
            chatHistory={chatHistory}
            isTyping={isTyping}
            animatedMessageIdx={animatedMessageIdx}
            setAnimatedMessageIdx={setAnimatedMessageIdx}
          />
        ))}
        {isTyping && (
          <TypingBubble>
            <span className="dot-flashing"></span>
          </TypingBubble>
        )}
      </MessagesContainer>

      {!userHasInteracted && !isTyping && (
        <SuggestionsList
          suggestions={suggestions}
          handleSendMessage={handleSendMessage}
        />
      )}

      {showEnquiryForm && (
        <EnquiryForm
          enquiryData={enquiryData}
          setEnquiryData={setEnquiryData}
          email={email}
          handleSubmitEnquiry={handleSubmitEnquiry}
          closeForm={() => {
            setShowEnquiryForm(false);
            setEnquiryData({ ...enquiryData, name: "", phone: "", message: "" });
            setTimeout(scrollToBottom, 150);
          }}
        />
      )}

      <InputContainer>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <ChatInput
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <VoiceButton
            isRecording={isRecording}
            onClick={handleMicClick}
            onTouchStart={handleMicTouchStart}
            onTouchEnd={handleMicTouchEnd}
            onMouseDown={handleMicMouseDown}
            onMouseUp={handleMicMouseUp}
          >
            {isRecording && !isMobile ? <FiSquare size={20} /> : <FiMic size={20} />}
          </VoiceButton>
          <SendButton
            onClick={() => handleSendMessage()}
            disabled={!message.trim() || isTyping}
          >
            <IoSend size={20} />
          </SendButton>
        </div>
        {/* Replaced the <p> tag with the VoiceMobileInstructions styled component */}
        <VoiceMobileInstructions>
          {isMobile
            ? "Hold mic button to record"
            : isRecording
            ? "Recording in progress..."
            : "Click mic to start recording"}
        </VoiceMobileInstructions>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatWindow;