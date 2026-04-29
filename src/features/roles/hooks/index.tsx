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
import { useDispatch } from "react-redux";
import { setPermissions } from "../../../redux/slice";
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
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["roles", id],
    queryFn: () => getrolebyidApi(id),
    enabled: !!id,

    onSuccess: (data) => {
      console.log("API DATA ", data); 
      dispatch(setPermissions(data));
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
