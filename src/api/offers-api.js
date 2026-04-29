import axiosInstance from "../lib/axiosInstance";

/**
 * POST /api/offers
 * 🔒 Any authenticated user
 * @param {{ taskId: string, price: number, estimatedTime?: string, message?: string }} payload
 * @returns {{ status, data: Offer, message }}
 */
export const submitOffer = async (payload) => {
  const { data } = await axiosInstance.post("/api/offers/", payload);
  return data;
};

/**
 * PATCH /api/offers/:offerId/accept
 * 👤 Customer only — accepts a worker's offer on their task
 * @param {string} offerId
 * @returns {{ status, data: Offer, message }}
 */
export const acceptOffer = async (offerId) => {
  const { data } = await axiosInstance.patch(`/api/offers/${offerId}/accept`);
  return data;
};
