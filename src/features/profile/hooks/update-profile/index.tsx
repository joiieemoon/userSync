import { useMutation } from "@tanstack/react-query";
import { updateProfileApi } from "../../service/update-profile-api";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      console.log("UPDATE RESPONSE:", data);
    },
    onError: (err) => {
      console.log("UPDATE ERROR:", err.message);
    },
  });
};
export const useGetProfilebyid = (id: number) => {
  return useMutation({
    mutationFn: () => updateProfileApi(id),
    onSuccess: (data) => {
      console.log("GET PROFILE RESPONSE:", data);
    },
    onError: (err) => {
      console.log("GET PROFILE ERROR:", err.message);
    },
  });
};
