import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getProfilebyidApi,
  updateProfileApi,
} from "../../service/update-profile-api";
import { User } from "../../../user/types";
import { useEffect } from "react";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileApi,
  });
};
// export const useGetProfilebyid = () => {
//   const queryClient = useQueryClient();
//   return useQuery<User>({
//     queryKey: ["profile"],
//     queryFn: () => getProfilebyidApi(),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["profile"],
//       });
//     },
//   });
//   // return useMutation({
//   //   mutationFn: getProfilebyidApi,
//   //   onSuccess: () => {
//   //     queryClient.invalidateQueries({
//   //       queryKey: ["profile"],
//   //     });
//   //   },
//   // });
// };

export const useGetProfilebyid = () => {
  const queryClient = useQueryClient();

  const query = useQuery<User>({
    queryKey: ["profile"],
    queryFn: () => getProfilebyidApi(),
  });
  useEffect(() => {
    if (query.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    }
  }, [query.isSuccess, queryClient]);

  return query;
};
