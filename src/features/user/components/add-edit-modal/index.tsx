import { Modal } from "../../../../components/ui/modal";

import Button from "../../../../components/ui/button";
import InputController from "../../../../components/ui/input/input-controller";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import {
  useGetUserById,
  useUpdateUser,
  useCreateUser,
} from "../../hooks/uselistusers-api";
import { updateUserValidation } from "../../../../components/ui/input/validation";
import { useListRoles } from "../../../roles/hooks";
import { updateusersFields } from "../../../../components/ui/input/input-config";
import { ChevronDownIcon } from "../../../../assets/icons";
// import { Role } from "../../../roles/types";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import type { User } from "../../types";
// import type { addEditUser } from "../../../auth/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { updateUserformProps } from "../../../../components/ui/input/validation";
import { Role } from "../../../roles/types";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
};

const AddEditUserModal = ({ isOpen, onClose, id }: Props) => {
  const { data: user } = useGetUserById(id!);
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  const { data: rolesData } = useListRoles({
    page: 1,
    limit: 100,
  });
  const updatefields = updateusersFields(id as number);
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({ resolver: zodResolver(updateUserValidation), mode: "all" });

  useEffect(() => {
    if (id && user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        roleId: String(user.roleId),
        username: user.username,
        isActive: user.isActive ? "true" : "false",
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        roleId: "",
        username: "",
        isActive: "true",
        password: "",
      });
    }
  }, [id, user, reset]);
  const onSubmit = (data: updateUserformProps) => {
    const payload: User = { ...data };

    if (id && !payload.password) {
      delete payload.password;
    }

    if (id) {
      updateUser(
        { id, data: payload },
        {
          onSuccess: () => {
            toast.success("User updated successfully");
            onClose();
          },
          onError: (error) => {
            Sentry.captureException(error);
            toast.error("Update failed");
          },
        },
      );
    } else {
      createUser(payload, {
        onSuccess: () => {
          toast.success("User created successfully");
          onClose();
        },
        onError: (error) => {
          Sentry.captureException(error);
          toast.error("Create failed");
        },
      });
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4"
      title={id ? "Update User" : "Add User"}
    >
      <form className="flex flex-col mx-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5 mt-6">
          {updatefields.map((field) => (
            <div key={field.name}>
              <InputController
                control={field.type}
                placeholder={field.placeholder}
                label={field.label}
                type={field.name === "password" ? "password" : "text"}
                // registration={register(field.name as string)}
                registration={register(
                  field.name as
                    | "email"
                    | "password"
                    | "firstName"
                    | "lastName"
                    | "phone"
                    | "username"
                    | "roleId"
                    | "isActive",
                )}
              />

              {errors[field.name as keyof typeof errors]?.message && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[field.name as keyof typeof errors]?.message as string}
                </p>
              )}
            </div>
          ))}
          <div className=" mt-3">
            <label className="text-sm">Role</label>
            <div className="relative">
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <InputController control="select" {...field}>
                    <option value="">Select Role</option>

                    {rolesData?.roles
                      ?.filter((role: Role) => role.id !== 1)
                      ?.map((role: Role) => (
                        <option key={role.id} value={String(role.id)}>
                          {role.title}
                        </option>
                      ))}
                  </InputController>
                )}
              />

              <span className="pointer-events-none absolute right-3 top-[50%] -translate-y-1/2 text-gray-500">
                <ChevronDownIcon className="w-5 h-5" />
              </span>
            </div>
            {errors.roleId?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.roleId.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="text-sm">Status</label>
            <div>
              <Controller
                name="isActive"
                control={control}
                defaultValue="true"
                render={({ field }) => (
                  <InputController control="select" {...field}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </InputController>
                )}
              />

              <span className="pointer-events-none absolute right-3 top-[70%] -translate-y-1/2 text-gray-500">
                <ChevronDownIcon className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <div
              className={` w-full rounded-lg  ${
                touchedFields.phone && errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PhoneInput
                    country={"in"}
                    value={field.value}
                    onChange={(phone) => field.onChange(phone)}
                    onBlur={field.onBlur}
                    inputClass="!w-full !h-11 !text-sm bg-red"
                    containerClass=" !w-full"
                  />
                )}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        {/* ACTIONS */}
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

export default AddEditUserModal;
