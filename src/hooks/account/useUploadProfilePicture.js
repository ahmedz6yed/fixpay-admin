import { useMutation } from "@tanstack/react-query";
import { uploadProfilePicture } from "../../api/account-api";

export const useUploadProfilePicture = (options = {}) => {
  return useMutation({
    mutationFn: (formData) => uploadProfilePicture(formData),
    ...options,
  });
};
