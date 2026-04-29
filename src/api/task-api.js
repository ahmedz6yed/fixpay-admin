import axiosInstance from "../lib/axiosInstance";

/**
 * GET /api/tasks/open
 * 🔒 Requires auth token
 * @returns {{ status, data: Task[], message }}
 */
export const getOpenTasks = async () => {
  const { data } = await axiosInstance.get("/api/tasks/open");
  return data;
};

/**
 * GET /api/tasks/:taskId/offers
 * 👤👑 Customer owner or Admin
 * @param {string} taskId
 * @returns {{ status, data: Offer[], message }}
 */
export const getTaskOffers = async (taskId) => {
  const { data } = await axiosInstance.get(`/api/tasks/${taskId}/offers`);
  return data;
};

/**
 * POST /api/tasks
 * 👤 Customer only — supports up to 5 images via multipart/form-data
 * @param {FormData} formData - Must include task fields + optional image files (key: "images")
 * @returns {{ status, data: Task, message }}
 */
export const createTask = async (formData) => {
  const { data } = await axiosInstance.post("/api/tasks/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

/**
 * PATCH /api/tasks/:taskId
 * 👤👑 Customer owner or Admin
 * @param {string} taskId
 * @param {Partial<Task>} payload - Fields to update
 * @returns {{ status, data: Task, message }}
 */
export const updateTask = async (taskId, payload) => {
  const { data } = await axiosInstance.patch(`/api/tasks/${taskId}`, payload);
  return data;
};

/**
 * DELETE /api/tasks/:taskId
 * 👤👑 Customer owner or Admin
 * @param {string} taskId
 * @returns {{ status, message }}
 */
export const deleteTask = async (taskId) => {
  const { data } = await axiosInstance.delete(`/api/tasks/${taskId}`);
  return data;
};
