import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginEmail } from "../api/auth-api";
import { useAuthStore } from "../store/authStore";

/**
 * Handles Option A: Email / Password login.
 *
 * Response shape from backend:
 *   { status, data: email, message, token }
 *
 * We decode the JWT to extract user info (email, _id, role)
 * so we don't need a separate /me endpoint.
 */
function decodeJwt(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { email: payload.email, _id: payload._id, role: payload.role };
  } catch {
    return null;
  }
}

export const useEmailLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginEmail,
    onSuccess: (response) => {
      const { token } = response;
      const user = decodeJwt(token); // extract { email, _id, role }
      setAuth({ token, user });
      navigate("/", { replace: true });
    },
    // onError is handled in the UI component for field-level feedback
  });
};
