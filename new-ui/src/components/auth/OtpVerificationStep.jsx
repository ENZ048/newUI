import React, { useCallback } from "react";
import {
  OtpContainer,
  Back,
  Shield,
  OtpTitle,
  SubText,
  EmailText,
  VerifyButton,
  ResendLink,
} from "../styled";
import { MdArrowBack } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import OtpInput from "./OtpInput";
import VerificationSuccess from "./VerificationSuccess";
import ClipLoader from "react-spinners/ClipLoader";

const OtpVerificationStep = ({
  otp,
  setOtp,
  // use a generic identifier label to support email or WhatsApp phone
  email,                // current prop from parent; this is really the identifier string
  label = "Email",      // "Email" | "WhatsApp"
  setOtpSent,
  handleVerifyOtp,
  loadingVerify,
  resendTimeout,
  handleSendOtp,
  loadingOtp,
  isVerified,
}) => {
  // Show success animation once verified
  if (isVerified) return <VerificationSuccess />;

  const onBack = useCallback(() => {
    setOtpSent(false);
    setOtp("");
  }, [setOtpSent, setOtp]);

  const onResend = useCallback(() => {
    if (!loadingOtp && resendTimeout === 0) handleSendOtp();
  }, [loadingOtp, resendTimeout, handleSendOtp]);

  const onKeyDownVerify = useCallback(
    (e) => {
      if (e.key === "Enter" && !loadingVerify && otp.length === 6) {
        handleVerifyOtp();
      }
    },
    [loadingVerify, otp, handleVerifyOtp]
  );

  return (
    <OtpContainer onKeyDown={onKeyDownVerify}>
      <Back onClick={onBack} aria-label="Go back to identifier input">
        <MdArrowBack />
      </Back>

      <Shield aria-hidden="true">
        <FaShieldAlt color="white" size={24} />
      </Shield>

      <OtpTitle>Verify Your {label}</OtpTitle>
      <SubText>We&apos;ve sent a 6-digit code to</SubText>
      <EmailText>{email}</EmailText>

      <OtpInput otp={otp} setOtp={setOtp} length={6} autoFocus />

      <VerifyButton
        onClick={handleVerifyOtp}
        disabled={loadingVerify || otp.length !== 6}
        aria-disabled={loadingVerify || otp.length !== 6}
      >
        {loadingVerify ? (
          <>
            <ClipLoader size={16} style={{ marginRight: 8 }} />
            Verifying...
          </>
        ) : (
          "Verify Code"
        )}
      </VerifyButton>

      <ResendLink aria-live="polite">
        {resendTimeout > 0 ? (
          <>Resend available in <strong>{resendTimeout}s</strong></>
        ) : (
          <>
            Didn&apos;t receive the code?{" "}
            <span
              role="button"
              tabIndex={0}
              onClick={onResend}
              onKeyDown={(e) => (e.key === "Enter" ? onResend() : null)}
              style={{ cursor: loadingOtp ? "not-allowed" : "pointer", textDecoration: "underline" }}
              aria-disabled={loadingOtp}
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
