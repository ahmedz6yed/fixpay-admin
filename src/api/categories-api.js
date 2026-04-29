import axiosInstance from "../lib/axiosInstance";

/**
 * GET /api/categories
 * 🔒 Requires auth token
 * @returns {{ status, data: Category[], message }}
 */
export const getAllCategories = async () => {
  const { data } = await axiosInstance.get("/api/categories/");
  return data;
};

/**
 * GET /api/categories/:id
 * 🔒 Requires auth token
 * @param {string} id - Category ID
 * @returns {{ status, data: Category, message }}
 */
export const getCategoryById = async (id) => {
  const { data } = await axiosInstance.get(`/api/categories/${id}`);
  return data;
};

/**
 * GET /api/categories/:id/workers
 * 🔒 Requires auth token
 * @param {string} id - Category ID
 * @returns {{ status, data: Worker[], message }}
 */
export const getWorkersByCategory = async (id) => {
  const { data } = await axiosInstance.get(`/api/categories/${id}/workers`);
  return data;
};

/**
 * POST /api/categories
 * 👑 Admin only
 * @param {{ name: string, description?: string, icon?: string }} payload
 * @returns {{ status, data: Category, message }}
 */
export const createCategory = async (payload) => {
  const { data } = await axiosInstance.post("/api/categories/", payload);
  return data;
};
