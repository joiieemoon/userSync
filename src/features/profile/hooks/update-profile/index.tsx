import { useMutation } from "@tanstack/react-query";
import { updateProfileApi } from "../../service/update-profile-api";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      console.log("UPDATE RESPONSE:", data);
    },
  });
};
