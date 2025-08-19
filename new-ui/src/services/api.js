// services/api.js
import axios from "axios";

// Prefer env var; fall back to localhost for dev
const API_BASE = "http://localhost:5000/api";


// Optional: create an axios instance (helps keep headers/timeouts consistent)
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // enable if your API uses cookies
  timeout: 30000,
});

// Fetch chatbot config
export const getClientConfig = (chatbotId) => {
  return axios.get(`${API_BASE}/chatbot/${chatbotId}/config`);
};  


// --- OTP ---

/**
 * Send OTP to email or phone.
 * @param {{ email?: string, phone?: string }} payload
 */
export const sendOtpApi = ({ email, phone }) => {
  return api.post("/otp/request-otp", { email, phone });
};

/**
 * Verify OTP for email or phone.
 * Backend expects: { email OR phone, otp, chatbotId }
 * Returns: { success, sessionId, ... }
 */
export const verifyOtpApi = ({ email, phone, otp, chatbotId }) => {
  return api.post("/otp/verify-otp", { email, phone, otp, chatbotId });
};

/**
 * Check if a session is valid.
 * Accepts either email or phone + chatbotId as query params.
 */
export const checkValidSession = ({ email, phone, chatbotId }) => {
  const params = new URLSearchParams();
  if (email) params.set("email", email);
  if (phone) params.set("phone", phone);
  params.set("chatbotId", chatbotId);
  return api.get(`/otp/check-session?${params.toString()}`);
};

// --- Chat ---

/**
 * Send a chatbot query.
 * Keep passing sessionId returned from verifyOtp.
 * Include the same identifier (email or phone) you used for login.
 */
export const chatbotApi = ({ query, chatbotId, sessionId, email, phone }) => {
  return api.post("/chat/query", {
    query,
    chatbotId,
    sessionId,
    email,
    phone,
  });
};

// --- Enquiry form ---

export const sendEnquiryApi = (payload) => {
  return api.post("/enquiry/submit", payload);
};

// --- Speech to text ---

export const speechToTextApi = (audioBlob, fileExtension = ".webm") => {
  const formData = new FormData();
  formData.append("audio", audioBlob, `voice${fileExtension}`);
  return api.post("/speech-to-text", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
