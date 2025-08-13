import React from "react";
import { FloatingUnit, ChatButton, Label } from "../styled";
import { BsChatDots } from "react-icons/bs";

const FloatingButton = ({ onClick, label }) => {
  return (
    <FloatingUnit>
      <ChatButton onClick={onClick}>
        <BsChatDots size={22} />
      </ChatButton>
      {label && <Label>{label}</Label>}
    </FloatingUnit>
  );
};

export default FloatingButton;
