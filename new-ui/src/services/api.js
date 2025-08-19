// services/api.js
import axios from "axios";

// Base API URL — change this to match your backend
// const API_BASE = "https://api.0804.in/api";
 const API_BASE = "http://localhost:5000/api";

export const getChatbotConfigApi = async (chatbotId) => {
  const response = await axios.get(`${API_BASE}/chatbots/${chatbotId}/config`);
  return response.data;
};

// UPDATED: Sends either {email} or {phone}
export const requestOtpApi = (identifier) => {
  return axios.post(`${API_BASE}/otp/request-otp`, identifier);
};

// UPDATED: Sends identifier, otp, and chatbotId
export const verifyOtpApi = (identifier, otp, chatbotId) => {
  return axios.post(`${API_BASE}/otp/verify-otp`, { ...identifier, otp, chatbotId });
};

// UPDATED: Checks session using email or phone in params
export const checkValidSession = async (identifier, chatbotId) => {
  const response = await axios.get(`${API_BASE}/otp/check-session`, {
    params: { ...identifier, chatbotId },
  });
  return response.data;
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