import React from "react";
import ReactMarkdown from "react-markdown";
import { TypeAnimation } from "react-type-animation";
import { MessageWrapper, MessageBubble, Timestamp } from "../styled";

function stripMarkdown(markdownText) {
  return markdownText
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[#>`]/g, "")
    .replace(/\n/g, " ");
}

const MessageItem = ({
  msg,
  idx,
  chatHistory,
  isTyping,
  animatedMessageIdx,
  setAnimatedMessageIdx
}) => {
  return (
    <MessageWrapper $isUser={msg.sender === "user"}>
      <div>
        <MessageBubble isUser={msg.sender === "user"}>
          {msg.sender === "bot" &&
          idx === chatHistory.length - 1 &&
          !isTyping &&
          animatedMessageIdx !== idx ? (
            <TypeAnimation
              key={idx}
              sequence={[stripMarkdown(msg.text), () => setAnimatedMessageIdx(idx)]}
              wrapper="span"
              cursor={false}
              speed={80}
              style={{ display: "inline-block" }}
              repeat={0}
            />
          ) : (
            <ReactMarkdown
              components={{
                a: ({...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "0",
                      color: "#1e90ff",
                      textDecoration: "none",
                      transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textDecoration = "underline";
                      e.target.style.color = "#0f62fe";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textDecoration = "none";
                      e.target.style.color = "#1e90ff";
                    }}
                  />
                ),
                p: ({...props }) => (
                  <p style={{ margin: "0", padding: "0" }} {...props} />
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
          )}
        </MessageBubble>
        <Timestamp>
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Timestamp>
      </div>
    </MessageWrapper>
  );
};

export default MessageItem;
