import { Modal } from "../../../../components/ui/modal";
import { Formik, Form } from "formik";
import Button from "../../../../components/ui/button/Button";
import InputController from "../../../../components/ui/input/input-controller";
import { toast } from "react-toastify";

import ToggleSwitch from "../../../../pages/Forms/form-elements/ToggleSwitch";

import { useGetRoleById, useupdateRoles, useCreateRole } from "../../hooks";
import {
  formatPermissionsForAPI,
  formatPermissionsForUI,
} from "../../../../lib/helper/flate-permission";
import { roleValidationSchema } from "../../../../components/ui/input/validation";
import { useMemo } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
};

const AddEditRoleModal = ({ isOpen, onClose, id }: Props) => {
  // const { data } = useGetRoleById(id!, {
  //   enabled: !!id,
  // });
  const { data } = useGetRoleById(id!);

  // console.log("this is get role by id ", data);
  const { mutate: updateRole, isPending } = useupdateRoles();
  const { mutate: createRole, isPending: isCreating } = useCreateRole();
  console.log("this is ultimate role in add edit", data);

  // const formattedPermissions = useMemo(() => {
  //   return formatPermissionsForUI(data?.permissions || []);
  // }, [data?.permissions]);
  const formattedPermissions = useMemo(() => {
    return formatPermissionsForUI(data?.permissions || []);
  }, [data?.permissions]);
  console.log("ROLE DATA:", data?.role?.title);
  console.log("PERMISSIONS:", data?.permissions);
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
                  onClose();
                },
                onError: (err: any) => {
                  toast.error(err?.response?.data?.message || "Update failed");
                },
              },
            );
          } else {
            createRole(payload, {
              onSuccess: () => {
                toast.success("Role created successfully");
                onClose();
              },
              onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Create failed");
              },
            });
          }
        }}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form className="flex flex-col mx-5">
            <div className="mt-6 space-y-5">
              <InputController
                control="input"
                label="Role Name"
                name="title"
                value={values.title}
                onChange={(e: any) => setFieldValue("title", e.target.value)}
              />

              {touched.title && errors.title && (
                <p className="text-xs text-red-500 mt-1">{errors.title}</p>
              )}
              <div>
                <label className="text-sm">Status</label>
                <InputController
                  control="select"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={values.status}
                  onChange={(e) => setFieldValue("status", e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </InputController>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm mb-2 block">Permissions</label>
              <ToggleSwitch
                value={values.permissions}
                onChange={(val) => setFieldValue("permissions", val)}
              />
              {touched.permissions && errors.permissions && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.permissions}
                </p>
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
