import React, { useRef, useEffect } from "react";
import { OtpInputContainer, OtpInputBox } from "../styled";

const OtpInput = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);
  const OTP_LENGTH = 6;

  // Effect to ensure the refs array is correctly populated
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, OTP_LENGTH);
  }, []);

  /**
   * Handles changes to an individual OTP input box.
   */
  const handleChange = (index, value) => {
    // Allow only the last character if multiple are entered
    if (value.length > 1) value = value.slice(-1);

    // Ensure the input is a digit
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    // Move to the next input if a digit is entered
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handles keyboard events like Backspace and arrow navigation.
   */
  const handleKeyDown = (index, e) => {
    switch (e.key) {
      case "Backspace":
        // If the current input is empty, move to and clear the previous one
        if (!otp[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowLeft":
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowRight":
        if (index < OTP_LENGTH - 1) {
          inputRefs.current[index + 1]?.focus();
        }
        break;
      default:
        break;
    }
  };

  /**
   * Handles pasting content into the OTP fields.
   */
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const numbers = paste.replace(/\D/g, "").slice(0, OTP_LENGTH);

    // Distribute the pasted numbers across the inputs
    const newOtp = numbers.padEnd(OTP_LENGTH, " ").split("");
    setOtp(newOtp.join("").trim());

    // Focus on the next empty input after the paste
    const nextIndex = Math.min(numbers.length, OTP_LENGTH - 1);
    if (numbers.length < OTP_LENGTH) {
      inputRefs.current[nextIndex]?.focus();
    } else {
      inputRefs.current[nextIndex]?.select();
    }
  };

  return (
    <OtpInputContainer>
      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
        <OtpInputBox
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          autoComplete="one-time-code"
        />
      ))}
    </OtpInputContainer>
  );
};

export default OtpInput;