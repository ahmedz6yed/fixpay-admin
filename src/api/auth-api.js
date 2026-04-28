import axiosInstance from "../lib/axiosInstance";

export const loginEmail = async ({ email, password }) => {
  const { data } = await axiosInstance.post("/api/user/login", {
    email,
    password,
  });
  return data; // { token, message }
};

export const loginGoogle = async ({ token }) => {
  const { data } = await axiosInstance.post("/api/user/google", { token });
  return data; // { token, user, needsPhoneNumber, needsSSn }
};

export const completeProfile = async ({ phoneNumber, ssn }) => {
  const { data } = await axiosInstance.post("/api/user/completeProfile", {
    phoneNumber,
    ssn,
  });
  return data; // updatedProfile
};
