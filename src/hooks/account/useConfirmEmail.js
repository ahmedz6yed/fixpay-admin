import { useMutation } from "@tanstack/react-query";
import { confirmEmail } from "../../api/account-api";

export const useConfirmEmail = (options = {}) => {
  return useMutation({
    mutationFn: (payload) => confirmEmail(payload),
    ...options,
  });
};
