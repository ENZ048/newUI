import React from "react";
import styled from "styled-components"; // Import styled-components to extend a component
import {
  AuthContainer, // Import the container for proper layout
  IconCircle,
  StyledMailIcon,
  Title,
  SubTitle,
  Input,
  Button,
} from "../styled";
import { FiArrowRight } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";

// New styled-component for the small info text, replacing the inline style.
const InfoText = styled(SubTitle)`
  font-size: 12px;
  margin-top: 12px;
  animation: none; /* Optionally remove parent animation if not needed */
`;

const EmailInputStep = ({
  email,
  setEmail,
  isEmailValid,
  setIsEmailValid,
  handleSendOtp,
  loadingOtp,
}) => {
  const validateEmail = (email) => {
    // Basic regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    // Use AuthContainer as the main wrapper for centering content
    <AuthContainer>
      <IconCircle>
        <StyledMailIcon />
      </IconCircle>
      <Title>Welcome!</Title>
      <SubTitle>
        Your smart AI partner for seamless support and innovative solutions. Ready
        when you are.
      </SubTitle>
      <Input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => {
          const inputEmail = e.target.value;
          setEmail(inputEmail);
          setIsEmailValid(validateEmail(inputEmail));
        }}
      />
      <Button onClick={handleSendOtp} disabled={loadingOtp || !isEmailValid}>
        {loadingOtp ? (
          <>
            <ClipLoader
              size={16}
              color={"#fff"}
              style={{ marginRight: "8px" }}
            />
            Sending...
          </>
        ) : (
          <>
            Continue with Email <FiArrowRight className="infinite-arrow" />
          </>
        )}
      </Button>
      <InfoText>
        We'll send you a verification code to get started securely.
      </InfoText>
    </AuthContainer>
  );
};

export default EmailInputStep;