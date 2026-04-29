import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/account-api";
import { useAuthStore } from "../../store/authStore";

export const useLogout = (options = {}) => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: logout,
    // Use onSettled so that even if the backend request fails (e.g., token already expired),
    // we still forcefully clear the local session and kick the user back to the login screen.
    onSettled: () => {
      // 1. Clear Zustand auth store (removes token from local storage)
      clearAuth();
      // 2. Clear all React Query cache so no sensitive data remains
      qc.clear();
      // 3. Force redirect to login
      navigate("/login", { replace: true });
    },
    ...options,
  });
};
