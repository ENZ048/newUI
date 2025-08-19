import React from 'react';
// You can use styled-components from your other auth files
// For simplicity, using inline styles here
import { ClipLoader } from "react-spinners"; // Or your preferred loader

const PhoneInputStep = ({ phone, setPhone, handleSendOtp, loadingOtp }) => {
  const onContinue = () => {
    // Basic validation
    if (phone && phone.length === 10) {
      handleSendOtp({ phone });
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h3>Continue with WhatsApp</h3>
      <p>We'll send a verification code to your number.</p>
      <input
        type="tel"
        placeholder="Enter your 10-digit phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
        maxLength="10"
        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '1rem' }}
      />
      <button onClick={onContinue} disabled={loadingOtp} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#25D366', color: 'white', cursor: 'pointer' }}>
        {loadingOtp ? <ClipLoader size={16} color="#fff" /> : 'Continue'}
      </button>
    </div>
  );
};

export default PhoneInputStep;