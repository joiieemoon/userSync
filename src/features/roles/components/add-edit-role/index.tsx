import { Modal } from "../../../../components/ui/modal";
import { Formik, Form } from "formik";
import Button from "../../../../components/ui/button/Button";
import InputController from "../../../../components/ui/input/input-controller";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import ToggleSwitch from "../../../../pages/Forms/form-elements/ToggleSwitch";

import { useGetRoleById, useupdateRoles, useCreateRole } from "../../hooks";
import {
  formatPermissionsForAPI,
  formatPermissionsForUI,
} from "../../../../lib/helper/flate-permission";
import { roleValidationSchema } from "../../../../components/ui/input/validation";
import { useMemo } from "react";
import { setPermissions } from "../../../../redux/slice";
import { useDispatch } from "react-redux";
import { ChevronDownIcon } from "../../../../assets/icons";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
};

const AddEditRoleModal = ({ isOpen, onClose, id }: Props) => {
  const { data } = useGetRoleById(id!);
  const dispatch = useDispatch();
  const { mutate: updateRole, isPending } = useupdateRoles();
  const { mutate: createRole, isPending: isCreating } = useCreateRole();
  const queryClient = useQueryClient();
  const formattedPermissions = useMemo(() => {
    return formatPermissionsForUI(data?.permissions || []);
  }, [data?.permissions]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-5xl m-4"
      title={id ? "Update Role" : "Add Role"}
    >
      <Formik
        enableReinitialize
        key={data?.id || "loading"}
        initialValues={{
          title: data?.role?.title || "",
          status: data?.role?.status || "active",
          permissions: formattedPermissions,
        }}
        validationSchema={roleValidationSchema}
        // onSubmit={(values) => {
        //   const payload = {
        //     ...values,
        //     permissions: formatPermissionsForAPI(values.permissions),
        //   };

        //   if (id) {
        //     updateRole(
        //       { id, data: payload },
        //       {
        //         onSuccess: () => {
        //           toast.success("Role updated successfully");
        //           onClose();
        //         },
        //         onError: (err: any) => {
        //           toast.error(err?.response?.data?.message || "Update failed");
        //         },
        //       },
        //     );
        //   } else {
        //     createRole(payload, {
        //       onSuccess: () => {
        //         toast.success("Role created successfully");
        //         onClose();
        //       },
        //       onError: (err: any) => {
        //         toast.error(err?.response?.data?.message || "Create failed");
        //       },
        //     });
        //   }
        //   dispatch(
        //     setPermissions({
        //       role: values.title,
        //       permissions: values.permissions,
        //     }),
        //   );
        // }}

        onSubmit={(values) => {
          const payload = {
            ...values,
            permissions: formatPermissionsForAPI(values.permissions),
          };

          if (id) {
            updateRole(
              { id, data: payload },
              {
                onSuccess: () => {
                  toast.success("Role updated successfully");
                  queryClient.invalidateQueries({ queryKey: ["profile"] });
                  onClose();

                  const formattedAccess = formatPermissionsForUI(
                    payload.permissions,
                  );

                  dispatch(
                    setPermissions({
                      role: values.title,
                      access: formattedAccess,
                    }),
                  );
                  console.log(
                    setPermissions({
                      role: values.title,
                      access: formattedAccess,
                    }),
                  );
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
                    permissions: payload.permissions,
                  }),
                );
              },
            });
          }
        }}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form className="flex flex-col mx-5 ">
            <div className=" ">
              <InputController
                control="input"
                label="Role Name"
                placeholder="Enter Role"
                name="title"
                value={values.title}
                onChange={(e: any) => setFieldValue("title", e.target.value)}
              />

              {touched.title && errors.title && (
                <p className="text-xs text-red-500 border">{errors.title}</p>
              )}

              <div className="mb-3 relative">
                <label className="text-sm">Status</label>
                <span></span>
                <InputController
                  control="select"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={values.status}
                  onChange={(e) => setFieldValue("status", e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </InputController>
                <span className="pointer-events-none absolute right-3 top-[70%] -translate-y-1/2 text-gray-500">
                  <ChevronDownIcon className="w-4 h-4" />
                  
                </span>
              </div>
            </div>

            {/* PERMISSIONS */}
            <div className="mt-6">
              <label className="text-sm mb-2 block">Permissions</label>

              <ToggleSwitch
                value={values.permissions}
                onChange={(val) => setFieldValue("permissions", val)}
              />

              {touched.permissions && errors.permissions && (
                <p className="text-xs text-red-500 ">{errors.permissions}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Close
              </Button>

              <Button type="submit" disabled={isPending || isCreating}>
                {isPending || isCreating
                  ? "Saving..."
                  : id
                    ? "Update"
                    : "Create"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddEditRoleModal;
