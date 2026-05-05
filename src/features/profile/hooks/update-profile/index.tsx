import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getProfilebyidApi,
  updateProfileApi,
} from "../../service/update-profile-api";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileApi,
  });
};
export const useGetProfilebyid = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfilebyidApi(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
  // return useMutation({
  //   mutationFn: getProfilebyidApi,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["profile"],
  //     });
  //   },
  // });
};
