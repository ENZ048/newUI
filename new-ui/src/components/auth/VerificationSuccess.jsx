import React from "react";
import {
  TickWrapper,
  Svg,
  AnimatedCircle,
  AnimatedPath,
  WelcomeMsg,
} from "../styled";

const VerificationSuccess = () => {
  return (
    <TickWrapper>
      <Svg viewBox="0 0 80 80">
        <AnimatedCircle cx="40" cy="40" r="25" />
        <AnimatedPath d="M28 40 l8 8 l16 -16" />
      </Svg>
      <WelcomeMsg>Verification Successful!</WelcomeMsg>
    </TickWrapper>
  );
};

export default VerificationSuccess;