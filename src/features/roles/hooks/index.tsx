import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createroleApi,
  deleteroleApi,
  getrolebyidApi,
  listrolesApi,
  updateroleApi,
} from "../service";

export const useListRoles = (params) => {
  return useQuery({
    queryKey: ["roles", params],
    queryFn: () => listrolesApi(params),
    placeholderData: keepPreviousData,
  });
};
export const usedeleteRoles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteroleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useupdateRoles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateroleApi(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },

    onError: (err: any) => {
      console.log("Update user error", err.message);
    },
  });
};
export const useGetRoleById = (id: number) => {
  return useQuery({
    queryKey: ["roles", id],
    queryFn: () => getrolebyidApi(id),
    enabled: !!id,
    onSuccess: () => {
      console.log("get data successful by id");
    },
    onError: (err: any) => {
      console.log("error get by id", err.message);
    },
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["roles"] });

  return useMutation({
    mutationFn: (data: any) => createroleApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      console.log("Create role error", err.message);
    },
  });
};
