import React from "react";
import {
  Header as StyledHeader,
  HeaderLeft,
  Avatar,
  StatusBlock,
  BotName,
  Status,
  CloseBtn
} from "../styled";
import { MdClose } from "react-icons/md";

const Header = ({ botAvatar, botName, online, onClose }) => {
  return (
    <StyledHeader>
      <HeaderLeft>
        <Avatar src={botAvatar} alt="Bot Avatar" />
        <StatusBlock>
          <BotName>{botName}</BotName>
          <Status>{online ? "Online" : "Offline"}</Status>
        </StatusBlock>
      </HeaderLeft>
      <CloseBtn onClick={onClose}>
        <MdClose size={20} />
      </CloseBtn>
    </StyledHeader>
  );
};

export default Header;
