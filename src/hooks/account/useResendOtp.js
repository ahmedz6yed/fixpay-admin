import { useMutation } from "@tanstack/react-query";
import { resendConfirmationOtp } from "../../api/account-api";

export const useResendOtp = (options = {}) => {
  return useMutation({
    mutationFn: (payload) => resendConfirmationOtp(payload),
    ...options,
  });
};
