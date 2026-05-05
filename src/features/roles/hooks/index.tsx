import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import type { RolePermission, PermissionFlags } from "../types";
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
import type { RolePayload, UpdateRolePayload } from "../types";
// import type { PermissionState } from "../../../redux/slice";
// import { formatPermissionsForUI } from "../../../lib/helper/flate-permission";
import type { GetRoleByIdResponse } from "../types";
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
export const useDeleteRoles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteroleApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
//
export const useUpdateRoles = () => {
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

  const { data } = useQuery<GetRoleByIdResponse>({
    queryKey: ["roles", id],
    queryFn: () => getrolebyidApi(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      const permissionData = {
        role: data.role.title || "",
        permissions: data.permissions.reduce(
          (acc: Record<string, PermissionFlags>, perm: RolePermission) => {
            acc[perm.moduleSlug] = {
              list: perm.list,
              view: perm.view,
              add: perm.add,
              edit: perm.edit,
              delete: perm.delete,
            };
            return acc;
          },
          {} as Record<string, PermissionFlags>,
        ),
      };
      dispatch(setPermissions(permissionData));
    }
  }, [data, dispatch]);

  return { data };
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
