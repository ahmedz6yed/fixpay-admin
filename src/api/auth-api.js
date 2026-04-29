import axiosInstance from "../lib/axiosInstance";

/**
 * POST /api/user/login
 * @returns {{ status, data, message, token }}
 */
export const loginEmail = async ({ email, password }) => {
  const { data } = await axiosInstance.post("/api/user/login", {
    email,
    password,
  });
  return data;
};
