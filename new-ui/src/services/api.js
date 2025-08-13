// services/api.js
import axios from "axios";

// Base API URL — change this to match your backend
const API_BASE = "https://api.0804.in/api";

// Send OTP to email
export const sendOtpApi = (email) => {
  return axios.post(`${API_BASE}/otp/request-otp`, { email });
};

// Verify OTP
export const verifyOtpApi = (email, otp, chatbotId, sessionId) => {
  return axios.post(`${API_BASE}/otp/verify-otp`, { email, otp, chatbotId, sessionId });
};

// Chatbot message query
export const chatbotApi = (query, chatbotId, email, sessionId) => {
  return axios.post(`${API_BASE}/chat/query`, {
    chatbotId,
    query,
    email,
    sessionId,
  });
};

// Submit enquiry form
export const sendEnquiryApi = (payload) => {
  return axios.post(`${API_BASE}/enquiry/submit`, payload);
};

// Speech-to-text
export const speechToTextApi = (audioBlob, fileExtension = ".webm") => {
  const formData = new FormData();
  formData.append("audio", audioBlob, `voice${fileExtension}`);
  return axios.post(`${API_BASE}/speech-to-text`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    timeout: 30000,
  });
};

export const checkValidSession = (email, chatbotId) => {
  return axios.get( `${API_BASE}/otp/check-session?email=${encodeURIComponent(
            email
          )}&chatbotId=${chatbotId}`);
}
