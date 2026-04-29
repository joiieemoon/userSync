import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfilebyidApi,
  updateProfileApi,
} from "../../service/update-profile-api";

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
export const useGetProfilebyid = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfilebyidApi(),

    onSuccess: (data) => {
      console.log("PROFILE DATA:", data);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      console.log("PROFILE ERROR:", err.message);
    },
  });
};


