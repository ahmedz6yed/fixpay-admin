import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../../api/account-api";

export const useCompleteProfile = (options = {}) => {
  return useMutation({
    mutationFn: (payload) => completeProfile(payload),
    ...options,
  });
};
