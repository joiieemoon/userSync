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
import { PaginationParams } from "../../user/types";
import type {
  
  RolePayload,
  UpdateRolePayload,
} from "../types";
import type { PermissionState } from "../../../redux/slice";
// Keeps previous page data to avoid UI flicker during pagination
export const useListRoles = (params: PaginationParams) => {
  return useQuery({
    queryKey: ["roles", params],
    queryFn: () => listrolesApi(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000,
  });
};

//delete roles and after that update ui by invalidate queries
export const usedeleteRoles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteroleApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
//
export const useupdateRoles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRolePayload }) =>
      //i need to fix this
      updateroleApi(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useGetRoleById = (id: number) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["roles", id],
    queryFn: () => getrolebyidApi(id),
    enabled: !!id,

    onSuccess: (data: PermissionState) => {
      dispatch(setPermissions(data));
    },
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["roles"] });

  return useMutation({
    mutationFn: (data: RolePayload) => createroleApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
