import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteuserApi, listusersApi } from "../../services/list-users-api";

export const useListUsers = (params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => listusersApi(params),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteuserApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
