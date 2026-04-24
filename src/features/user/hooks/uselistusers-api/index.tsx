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
import { User } from "../../types";

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getuserbyidApi(id),
    enabled: !!id,
    onSuccess: () => {
      console.log("get data successful by id");
    },
    onError: (err: any) => {
      console.log("error get by id", err.message);
    },
  });
};
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

    onError: (err: any) => {
      console.log("Update user error", err.message);
    },
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: User) => createuserApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("user created ");
    },
    onError: (err: any) => {
      console.log("Create user error", err.message);
    },
  });
};
