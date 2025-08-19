import React, { useRef, useEffect } from "react";
import { OtpInputContainer, OtpInputBox } from "../styled";

const OtpInput = ({ otp = "", setOtp, length = 6, autoFocus = true }) => {
  const inputRefs = useRef([]);

  // Ensure refs length is stable
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Always work with a fixed-length array of digits
  const getDigits = () =>
    Array.from({ length }, (_, i) => (otp && otp[i] ? otp[i] : ""));

  const focusIndex = (i) => {
    if (i >= 0 && i < length) inputRefs.current[i]?.focus();
  };

  const setDigit = (index, val) => {
    const digits = getDigits();
    digits[index] = val;
    setOtp(digits.join(""));
  };

  const handleChange = (index, raw) => {
    let value = raw ?? "";
    // Keep only the last typed char
    if (value.length > 1) value = value.slice(-1);
    // Only digits or empty
    if (value && !/^[0-9]$/.test(value)) return;

    setDigit(index, value);

    // Move to next on valid digit
    if (value && index < length - 1) focusIndex(index + 1);
  };

  const handleKeyDown = (index, e) => {
    const key = e.key;

    if (key === "Backspace") {
      const digits = getDigits();
      if (digits[index]) {
        // Clear current box
        setDigit(index, "");
      } else {
        // Move left and clear previous
        const prev = Math.max(0, index - 1);
        setDigit(prev, "");
        focusIndex(prev);
      }
      e.preventDefault();
      return;
    }

    if (key === "ArrowLeft") {
      focusIndex(Math.max(0, index - 1));
      e.preventDefault();
      return;
    }

    if (key === "ArrowRight") {
      focusIndex(Math.min(length - 1, index + 1));
      e.preventDefault();
      return;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text") || "";
    const digitsOnly = paste.replace(/\D/g, "").slice(0, length);
    if (!digitsOnly) return;

    const digits = getDigits();
    for (let i = 0; i < length; i++) {
      digits[i] = digitsOnly[i] || "";
    }
    setOtp(digits.join(""));

    // Focus last filled box (or last box)
    const nextIdx = Math.min(digitsOnly.length - 1, length - 1);
    focusIndex(nextIdx);
    inputRefs.current[nextIdx]?.select?.();
  };

  const digits = getDigits();

  return (
    <OtpInputContainer>
      {Array.from({ length }).map((_, index) => (
        <OtpInputBox
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          autoComplete="one-time-code"
          {...(autoFocus && index === 0 ? { autoFocus: true } : {})}
        />
      ))}
    </OtpInputContainer>
  );
};

export default OtpInput;
