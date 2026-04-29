import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null, // JWT access token
      user: null, // { email, _id, role } decoded or from response

      setAuth: ({ token, user }) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // localStorage key
      // Only persist what you need — never persist sensitive UI state
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);
