// styled.js
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { FiMail } from "react-icons/fi";

/* --- Keyframes & Global Styles --- */
export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

   body.no-scroll {
    position: fixed !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 100% !important;
  }

  .dot-flashing {
    position: relative;
    width: 8px;
    height: 8px;
    background-color: #888;
    border-radius: 50%;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0s;
  }

  .dot-flashing::before,
  .dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    width: 8px;
    height: 8px;
    background-color: #888;
    border-radius: 50%;
  }

  .dot-flashing::before {
    left: -12px;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.2s;
  }

  .dot-flashing::after {
    left: 12px;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.4s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: #ccc;
    }
    50%,
    100% {
      background-color: #888;
    }
  }

  /* Cosmic Circle Pulse Animation */
.cosmic-circle {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cosmic-core {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 0%, #60a5fa 30%, #a855f7 70%, transparent 100%);
  box-shadow: 
    0 0 20px #60a5fa,
    0 0 40px #a855f7,
    0 0 60px #ffffff,
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  animation: core-glow 2s ease-in-out infinite alternate;
  z-index: 3;
}

.pulse-ring {
  position: absolute;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: pulse-expand 3s ease-out infinite;
}

.pulse-ring-1 {
  width: 80px;
  height: 80px;
  border-color: rgba(96, 165, 250, 0.6);
  animation-delay: 0s;
}

.pulse-ring-2 {
  width: 120px;
  height: 120px;
  border-color: rgba(168, 85, 247, 0.4);
  animation-delay: 1s;
}

.pulse-ring-3 {
  width: 160px;
  height: 160px;
  border-color: rgba(255, 255, 255, 0.3);
  animation-delay: 2s;
}

@keyframes core-glow {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
    box-shadow: 
      0 0 15px #60a5fa,
      0 0 30px #a855f7,
      0 0 45px #ffffff,
      inset 0 0 15px rgba(255, 255, 255, 0.2);
  }
  100% {
    transform: scale(1.1);
    opacity: 1;
    box-shadow: 
      0 0 25px #60a5fa,
      0 0 50px #a855f7,
      0 0 75px #ffffff,
      inset 0 0 25px rgba(255, 255, 255, 0.4);
  }
}

@keyframes pulse-expand {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .cosmic-circle {
    width: 150px;
    height: 150px;
  }
  
  .cosmic-core {
    width: 30px;
    height: 30px;
  }
  
  .pulse-ring-1 {
    width: 60px;
    height: 60px;
  }
  
  .pulse-ring-2 {
    width: 90px;
    height: 90px;
  }
  
  .pulse-ring-3 {
    width: 120px;
    height: 120px;
  }
}

.cosmic-circle {
  will-change: transform;
}

.cosmic-core, .pulse-ring {
  will-change: transform, opacity;
}

`;

export const Wrapper = styled.div`
  @keyframes slideOut {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    40% {
      transform: scale(0.97);
    }
    100% {
      opacity: 0;
      transform: translateY(100px) scale(0.9);
    }
  }

  @keyframes pop {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    60% {
      transform: scale(1.15);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes fadeInItem {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  font-family: "Amaranth", "Poppins", sans-serif;
`;

export const Overlay = styled.div`
  opacity: 0;
  animation: fadeIn 0.4s ease forwards 0s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem; /* Added for spacing on smaller screens */
`;

export const Chatbox = styled.div`
  &.closing {
    animation: slideOut 0.5s ease forwards;
  }
  transform: translateY(40px);
  opacity: 0;
  animation: slideUp 0.5s ease-out forwards;
  width: 100%; /* Changed from 90% */
  max-width: 420px;
  height: 95vh; /* Adjusted for better viewport fit */
  max-height: 700px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  @media (max-width: 480px) {
    height: 97vh;
    max-height: 100vh;
    border-radius: 15px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: linear-gradient(
    90deg,
    hsla(344, 97%, 63%, 1),
    hsla(232, 90%, 59%, 1)
  );
  flex-shrink: 0;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: auto !important;
  height: 50px !important; /* Adjusted size */
`;

export const StatusBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export const BotName = styled.div`
  font-weight: 600;
  color: white;
  font-size: 1.5rem;
  padding-left: 6px;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const Status = styled.div`
  font-size: 0.75rem;
  color: #e0e0e0ff;
  position: relative;
  padding-left: 6px;
`;

export const CloseBtn = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
  transition: transform 0.3s ease-in-out, color 0.2s ease;

  &:hover {
    transform: rotate(90deg);
    color: #f1f1f1;
  }
`;

export const AuthContainer = styled.div`
  animation: slideDown 0.5s ease-in-out 0.6s;
  animation-fill-mode: both;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
  overflow-y: auto; /* Allow scrolling on small screens */
`;

export const IconCircle = styled.div`
  animation: pop 3s ease-in-out;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    hsla(344, 97%, 63%, 1) 0%,
    hsla(232, 90%, 59%, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
  flex-shrink: 0; /* Prevent shrinking */
`;

export const StyledMailIcon = styled(FiMail)`
  color: white;
  font-size: 36px;
`;

export const Title = styled.h2`
  animation: fadeInItem 0.5s ease 0.7s both;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem 0;
  color: #4b4b4b;
`;

export const SubTitle = styled.p`
  animation: fadeInItem 0.5s ease 0.9s both;
  font-size: 0.875rem;
  color: #777;
  margin-bottom: 2rem;
  max-width: 320px; /* Constrain width for better readability */
`;

export const Input = styled.input`
  animation: fadeInItem 0.5s ease 1.1s both;
  width: 100%;
  max-width: 370px;
  padding: 1rem;
  font-size: 0.875rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
  text-align: center; /* Center placeholder and input text */

  &::placeholder {
    text-align: center; /* Specifically center placeholder */
  }

  &:focus {
    border-color: #a97fff;
  }
`;

const bounceX = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(-6px);
  }
  60% {
    transform: translateX(4px);
  }
`;

export const Button = styled.button`
  animation: fadeInItem 0.5s ease 1.3s both;
  width: 100%;
  max-width: 250px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  background: linear-gradient(
    90deg,
    hsla(344, 97%, 63%, 1) 0%,
    hsla(232, 90%, 59%, 1) 100%
  );
  color: white;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.25s ease;

  &:not(:disabled):hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .infinite-arrow {
    animation: ${bounceX} 1.2s infinite ease-in-out;
    position: relative;
    top: 1px;
    display: inline-block;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  position: relative;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const InputContainer = styled.div`
  flex-shrink: 0;
  padding: 1.25rem;
  border-top: 1px solid #eee;
  background: white;
  position: relative;
`;

export const ChatInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 0.875rem;
  width: 100%;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #a97fff;
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0.625rem 0;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};

  & > div {
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
    max-width: 80%; /* Prevent messages from being too wide */
  }
`;

export const MessageBubble = styled.div`
  background: ${(props) => (props.isUser ? "#ede7f6" : "#f2f2f2")};
  border-radius: 20px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  line-height: 1.4;
  word-wrap: break-word;
  box-shadow: none;
`;

export const Timestamp = styled.span`
  font-size: 0.625rem;
  color: #888;
  margin-top: 0.375rem;
`;

const drawCircle = keyframes`
 from {
  stroke-dashoffset: 157;
 }
 to {
  stroke-dashoffset: 0;
 }
`;

const drawCheck = keyframes`
 from {
  stroke-dashoffset: 36;
 }
 to {
  stroke-dashoffset: 0;
 }
`;

const fadeIn = keyframes`
 from {
  opacity: 0;
 }
 to {
  opacity: 1;
 }
`;

const fadeOut = keyframes`
 from {
  opacity: 1;
 }
 to {
  opacity: 0;
 }
`;

export const TickWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 40px;
  animation: ${fadeOut} 0.6s ease-in 3.5s forwards;
`;

export const Svg = styled.svg`
  width: 80px;
  height: 80px;
`;

export const AnimatedCircle = styled.circle`
  stroke: #4caf50;
  stroke-width: 4;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 158;
  stroke-dashoffset: 158;
  animation: ${drawCircle} 1s ease-out forwards;
`;

export const AnimatedPath = styled.path`
  stroke: #4caf50;
  stroke-width: 5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 36;
  stroke-dashoffset: 36;
  animation: ${drawCheck} 0.5s ease-in-out 1s forwards;
`;

export const WelcomeMsg = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-top: 16px;
  color: #333;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out 1.5s forwards;
`;

export const TypingBubble = styled(MessageBubble)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 16px;
`;

const glow = keyframes`
 0% { box-shadow: 0 0 0px #cc33ff; }
 50% { box-shadow: 0 0 12px #cc33ff; }
 100% { box-shadow: 0 0 0px #cc33ff; }
`;

// otp conatainer

export const OtpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 24px;
  flex-grow: 1; /* Allows it to fill the available space */
  justify-content: center; /* Vertically centers the content block */
`;

export const Back = styled.div`
  /* --- New Style --- */
  align-self: flex-start; /* Aligns this item to the left, ignoring parent's center alignment */

  /* --- Old style to remove --- */
  /* width: 100%; */

  /* --- Keep other styles --- */
  text-align: left;
  cursor: pointer;
  font-size: 24px;
  color: #888;
  margin-bottom: 20px;
`;

export const Shield = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 50%;
  margin: 0 auto 24px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${glow} 2s infinite;
`;

export const OtpTitle = styled.h2`
  color: #a855f7;
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
`;

export const SubText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0 0 4px 0;
  line-height: 1.4;
`;

export const EmailText = styled.p`
  color: #a855f7;
  font-weight: 600;
  margin: 0 0 32px 0;
  font-size: 14px;
`;

export const OtpInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem; /* Adjusted gap */
  margin: 0 0 1.5rem 0;
  padding: 0;
`;

export const OtpInputBox = styled.input`
  width: 40px !important; /* Made boxes smaller */
  height: 48px !important;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: #f9fafb;
  color: #111827;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #a855f7;
    background: white;
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const VerifyButton = styled.button`
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 14px 24px;
  border-radius: 12px;
  border: none;
  width: 100%;
  margin: 0 0 20px 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ResendLink = styled.p`
  color: #666;
  font-size: 13px;
  margin: 0;
  line-height: 1.4;

  span {
    color: #a855f7;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      color: #9333ea;
    }
  }
`;

export const SendButton = styled.button`
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border: none;
  border-radius: 50%;
  width: 44px; /* Adjusted size */
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  flex-shrink: 0;

  svg {
    color: inherit;
    flex-shrink: 0;
  }

  &:hover:not(:disabled) {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const floatUnit = keyframes`
 0%, 100% {
  transform: translateY(0px);
 }
 50% {
  transform: translateY(-6px);
 }
`;

export const FloatingUnit = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${floatUnit} 3s ease-in-out infinite;

  @media (max-width: 480px) {
    bottom: 0.5rem;
    right: 0.5rem;
  }
`;

export const Label = styled.div`
  background: hsla(205, 46%, 30%, 1);
  background: linear-gradient(
    90deg,
    hsla(205, 46%, 30%, 1) 0%,
    hsla(260, 29%, 36%, 1) 100%
  );
  background: -moz-linear-gradient(
    90deg,
    hsla(205, 46%, 30%, 1) 0%,
    hsla(260, 29%, 36%, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    hsla(205, 46%, 30%, 1) 0%,
    hsla(260, 29%, 36%, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#295270", endColorstr="#524175", GradientType=1);
  color: #fff;
  padding: 4px 25px; /* Adjusted padding */
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.8rem; /* Adjusted font size */
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transform: translate(3px, -4px);
  margin-bottom: 0.5rem; /* Added margin */
`;

export const ChatButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: auto;
    height: 90px; /* Adjusted size */
    @media (max-width: 480px) {
      height: 70px; /* Smaller on mobile */
    }
  }
`;

export const VoiceButton = styled.button`
  background: ${(props) =>
    props.$isRecording
      ? "linear-gradient(135deg, #ef4444, #dc2626)"
      : "linear-gradient(135deg, #a855f7, #ec4899)"};
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 9999; /* Higher than overlay */
  transform: ${(props) => (props.$isRecording ? "scale(1.1)" : "scale(1)")};

  /* Add pulsing animation when recording */
  ${(props) =>
    props.$isRecording &&
    `
    animation: pulse 1s infinite;
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
  `}

  @keyframes pulse {
    0% {
      box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
    }
    50% {
      box-shadow: 0 0 25px rgba(239, 68, 68, 0.8);
    }
    100% {
      box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
    }
  }

  svg {
    color: inherit;
    flex-shrink: 0;
  }

  &:hover:not(:disabled) {
    transform: ${(props) => (props.$isRecording ? "scale(1.2)" : "scale(1.1)")};
    box-shadow: ${(props) =>
      props.$isRecording
        ? "0 0 20px rgba(239, 68, 68, 0.6)"
        : "0 4px 12px rgba(168, 85, 247, 0.3)"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const StopRecordingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 12px; /* More rounded */
  padding: 0.75rem 1.5rem; /* Larger padding */
  font-size: 0.875rem; /* Slightly larger text */
  font-weight: 700; /* Bolder text */
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4); /* Stronger shadow */
  position: relative;
  z-index: 10000;

  /* Add pulsing effect */
  animation: pulse-stop 1.5s infinite;

  @keyframes pulse-stop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  svg {
    flex-shrink: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.5);
    background: linear-gradient(135deg, #dc2626, #b91c1c);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const VoiceMobileInstructions = styled.p`
  text-align: center;
  color: #888;
  font-size: 0.75rem;
  margin: 0.5rem 0 0 0;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0 0.5rem;
  }
`;

export const EnquiryBox = styled.div`
  position: relative;
  padding: 1rem;
  margin: 1rem;
  background: #f0f9ff;
  border-radius: 12px;
  border: 1px solid #c7d2fe;
  animation: fadeIn 0.3s ease-in;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #555;
  cursor: pointer;
`;

export const EnquiryHeading = styled.h4`
  margin-bottom: 0.75rem;
  color: #1e40af;
`;

export const EnquiryInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const EnquiryTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const EmailInput = styled(EnquiryInput)`
  background-color: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
`;

export const SubmitButton = styled.button`
  margin-top: 12px;
  padding: 10px 16px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
`;
