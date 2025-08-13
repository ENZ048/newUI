import React from "react";
import { VoiceButton as StyledVoiceButton } from "../styled";

const VoiceButton = ({
  isRecording,
  onClick,
  onTouchStart,
  onTouchEnd,
  onMouseDown,
  onMouseUp,
  children
}) => {
  return (
    <StyledVoiceButton
      isRecording={isRecording}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </StyledVoiceButton>
  );
};

export default VoiceButton;
