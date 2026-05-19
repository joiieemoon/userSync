import { Modal } from "../../../../components/ui/modal";

import Button from "../../../../components/ui/button";
import InputController from "../../../../components/ui/input/input-controller";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import ToggleSwitch from "../toggle-switch";

import { useGetRoleById, useUpdateRoles, useCreateRole } from "../../hooks";
import {
  formatPermissionsForAPI,
  formatPermissionsForUI,
} from "../../../../lib/helper/flate-permission";
import { roleValidationSchema } from "../../../../components/ui/input/validation";
import { useMemo, useEffect } from "react";
import { setPermissions } from "../../../../redux/slice";
import { useDispatch } from "react-redux";
import { ChevronDownIcon } from "../../../../assets/icons";
import { usePermission } from "../../../auth/hooks/uselogin-singup";
import type { AddEditRoleProps, AccessMap, RoleFormValues } from "../../types";

import * as Sentry from "@sentry/react";
import { useAuth } from "../../../auth/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddEditRoleModal = ({ isOpen, onClose, id }: AddEditRoleProps) => {
  const { user } = useAuth();
  const { data } = useGetRoleById(id!);
  const dispatch = useDispatch();
  const { mutate: updateRole, isPending } = useUpdateRoles();
  const { mutate: createRole, isPending: isCreating } = useCreateRole();
  const queryClient = useQueryClient();
  const formattedPermissions = useMemo(() => {
    return formatPermissionsForUI(data?.permissions || []);
  }, [data?.permissions]);

  const userRoleId = user?.roleId;
  const { data: refetchPermission } = usePermission(userRoleId as number);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleValidationSchema),
    defaultValues: {
      title: "",
      status: "active",
      permissions: {},
    },
  });

  useEffect(() => {
    if (data?.role) {
      reset({
        title: data.role.title || "",
        status: data.role.status || "active",
        permissions: formattedPermissions,
      });
    }
  }, [data, formattedPermissions, reset]);
  const onSubmit = (values: RoleFormValues) => {
    const payload = {
      ...values,
      permissions: formatPermissionsForAPI(values.permissions as AccessMap),
    };

    if (id) {
      updateRole(
        { id, data: payload },
        {
          onSuccess: () => {
            toast.success("Role updated successfully");
            queryClient.invalidateQueries({
              queryKey: ["profile"],
            });

            onClose();

            Sentry.captureMessage("permission updated ");

            refetchPermission();
          },
        },
      );
    } else {
      createRole(payload, {
        onSuccess: () => {
          toast.success("Role created successfully");

          onClose();

          dispatch(
            setPermissions({
              role: payload.title,
              permissions: formatPermissionsForUI(payload.permissions),
            }),
          );
        },
      });
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-5xl m-4"
      title={id ? "Update Role" : "Add Role"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-5 ">
        <div className=" ">
          <InputController
            control="input"
            label="Role Name"
            placeholder="Enter Role"
            registration={register("title")}
            error={!!errors.title}
            errorMessage={errors.title?.message}
          />

          {touchedFields.title && errors.title && (
            <p className="text-xs text-red-500">{errors.title.message}</p>
          )}

          <div className="mb-3 relative">
            <label className="text-sm">Status</label>
            <span></span>
            <Controller
              name="status"
              control={control}
              defaultValue="active"
              render={({ field }) => (
                <InputController
                  control="select"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </InputController>
              )}
            />
            <span className="pointer-events-none absolute right-3 top-[70%] -translate-y-1/2 text-gray-500">
              <ChevronDownIcon className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* PERMISSIONS */}
        <div className="mt-6">
          <label className="text-sm mb-2 block">Permissions</label>

          <Controller
            name="permissions"
            control={control}
            render={({ field }) => (
              <ToggleSwitch value={field.value} onChange={field.onChange} />
            )}
          />

          {touchedFields.permissions?.users?.view &&
            errors.permissions?.users?.view && (
              <p className="text-xs text-red-500">
                {String(errors.permissions.users.view)}
              </p>
            )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>

          <Button type="submit" disabled={isPending || isCreating}>
            {isPending || isCreating ? "Saving..." : id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditRoleModal;
