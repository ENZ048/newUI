import React from "react";
import { Overlay, Chatbox, Header, HeaderLeft, BotName } from "../styled";
import { MdClose } from "react-icons/md";

const VoiceOverlay = ({
  botName,
  isRecording,
  isMobile,
  stopRecording
}) => {
  if (!isRecording || !isMobile) return null;

  return (
    <Overlay>
      <Chatbox>
        <Header>
          <HeaderLeft>
            <BotName>{botName}</BotName>
          </HeaderLeft>
          <MdClose
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={stopRecording}
          />
        </Header>
        <div className="cosmic-circle"></div>
        <p style={{ textAlign: "center", color: "#fff", marginTop: "20px" }}>
          Recording... release to stop
        </p>
      </Chatbox>
    </Overlay>
  );
};

export default VoiceOverlay;
