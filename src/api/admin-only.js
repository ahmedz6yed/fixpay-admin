import axiosInstance from "../lib/axiosInstance";

// All user routes — token is auto-attached by the request interceptor

export const getAllUsers = () =>
  axiosInstance.get("/api/user/").then((r) => r.data);

export const getUserById = (id) =>
  axiosInstance.get(`/api/user/${id}`).then((r) => r.data);

export const editUser = (id, payload) =>
  axiosInstance.patch(`/api/user/${id}`, payload).then((r) => r.data);

export const deleteUser = (id) =>
  axiosInstance.delete(`/api/user/${id}`).then((r) => r.data);

export const assignAdmin = (id) =>
  axiosInstance.patch(`/api/user/assign-admin/${id}`).then((r) => r.data);
