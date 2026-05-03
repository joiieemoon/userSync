import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createuserApi,
  deleteuserApi,
  getuserbyidApi,
  listusersApi,
  updateuserApi,
} from "../../services/list-users-api";
import {  User } from "../../types";

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getuserbyidApi(id),
    enabled: !!id,
  
    
  });
};
export const useListUsers = (params:PaginationParams, options = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => listusersApi(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteuserApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: User }) =>
      updateuserApi(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: User) => createuserApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    
    },
   
  });
};
