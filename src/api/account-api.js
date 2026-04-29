import axiosInstance from "../lib/axiosInstance";

/**
 * POST /api/user/logout
 * 🔒 Log out — blacklists the current JWT
 * @returns {{ status, message }}
 */
export const logout = async () => {
  const { data } = await axiosInstance.post("/api/user/logout");
  return data;
};

/**
 * POST /api/user/confirmEmail
 * Confirm email address using the OTP code
 * @param {{ email: string, otp: string }} payload
 * @returns {{ status, message }}
 */
export const confirmEmail = async (payload) => {
  const { data } = await axiosInstance.post("/api/user/confirmEmail", payload);
  return data;
};

/**
 * POST /api/user/resend-confirmation-otp
 * Resend the email confirmation OTP
 * @param {{ email: string }} payload
 * @returns {{ status, message }}
 */
export const resendConfirmationOtp = async (payload) => {
  const { data } = await axiosInstance.post("/api/user/resend-confirmation-otp", payload);
  return data;
};

/**
 * POST /api/user/complete-profile
 * Complete profile after initial registration
 * @param {Object} payload - User profile data (address, phone, etc.)
 * @returns {{ status, data: User, message }}
 */
export const completeProfile = async (payload) => {
  const { data } = await axiosInstance.post("/api/user/complete-profile", payload);
  return data;
};

/**
 * POST /api/user/upload
 * 🔒 Upload a profile picture
 * @param {FormData} formData - Must contain the image file under a specific key (e.g., 'avatar' or 'image')
 * @returns {{ status, data: { url: string }, message }}
 */
export const uploadProfilePicture = async (formData) => {
  const { data } = await axiosInstance.post("/api/user/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
