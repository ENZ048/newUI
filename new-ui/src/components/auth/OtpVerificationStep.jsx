import React from "react";
import { OtpContainer, Back, Shield, OtpTitle, SubText, EmailText, VerifyButton, ResendLink } from "../styled";
import { MdArrowBack } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import OtpInput from "./OtpInput";
import VerificationSuccess from "./VerificationSuccess"; // Import the new component
import ClipLoader from "react-spinners/ClipLoader";

const OtpVerificationStep = ({
  otp,
  setOtp,
  email,
  setOtpSent,
  handleVerifyOtp,
  loadingVerify,
  resendTimeout,
  handleSendOtp,
  loadingOtp,
  isVerified, // Receive the new 'isVerified' prop
}) => {
  // If verified, show the success animation and nothing else.
  if (isVerified) {
    return <VerificationSuccess />;
  }

  // Otherwise, show the OTP form.
  return (
    <OtpContainer>
      <Back
        onClick={() => {
          setOtpSent(false);
          setOtp("");
        }}
      >
        <MdArrowBack />
      </Back>
      <Shield>
        <FaShieldAlt color="white" size={24} />
      </Shield>
      <OtpTitle>Verify Your Email</OtpTitle>
      <SubText>We've sent a 6-digit code to</SubText>
      <EmailText>{email}</EmailText>
      <OtpInput otp={otp} setOtp={setOtp} />
      <VerifyButton
        onClick={handleVerifyOtp}
        disabled={loadingVerify || otp.length !== 6}
      >
        {loadingVerify ? (
          <>
            <ClipLoader size={16} color={"#fff"} style={{ marginRight: "8px" }} />
            Verifying...
          </>
        ) : (
          "Verify Code"
        )}
      </VerifyButton>
      <ResendLink>
        {resendTimeout > 0 ? (
          <>Resend available in <strong>{resendTimeout}s</strong></>
        ) : (
          <>
            Didn't receive the code?{" "}
            <span
              onClick={!loadingOtp ? handleSendOtp : undefined}
              style={{ cursor: loadingOtp ? "not-allowed" : "pointer" }}
            >
              {loadingOtp ? "Sending..." : "Resend Code"}
            </span>
          </>
        )}
      </ResendLink>
    </OtpContainer>
  );
};

export default OtpVerificationStep;