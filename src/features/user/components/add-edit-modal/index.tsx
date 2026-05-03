import { Modal } from "../../../../components/ui/modal";
import { Formik, Form } from "formik";
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
import { Role } from "../../../roles/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
};

const AddEditUserModal = ({ isOpen, onClose, id }: Props) => {
  const { data: user } = useGetUserById(id!, {
    enabled: !!id,
  });

  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  const { data: rolesData } = useListRoles({
    page: 1,
    limit: 100,
  });
  const updatefields = updateusersFields(id);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4"
      title={id ? "Update User" : "Add User"}
    >
      <Formik
        enableReinitialize
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          username: user?.username || "",
          phone: user?.phone || "",
          password: user?.password || "",
          roleId: user?.roleId || "",
          isActive: user?.isActive ?? true,
        }}
        validationSchema={updateUserValidation}
        onSubmit={(values, { resetForm }) => {
          const payload = {
            ...values,
          };
          if (id) {
            if (!payload.password) {
              delete payload.password;
            }
          }
          if (id) {
            updateUser(
              { id, data: payload },
              {
                onSuccess: () => {
                  toast.success("User updated successfully");
                  onClose();
                },
                onError: (error: any) => {
                  toast.error(
                    error?.response?.data?.message || "Update failed",
                  );
                },
              },
            );
          } else {
            createUser(payload, {
              onSuccess: () => {
                toast.success("User created successfully");
                resetForm();
                onClose();
              },
              onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Create failed");
              },
            });
          }
        }}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form className="flex flex-col mx-5">
            <div className="grid grid-cols-2 gap-5 mt-6">
              {updatefields.map((field) => (
                <div key={field.name}>
                  <InputController
                    control={field.type}
                    placeholder={field.placeholder}
                    label={field.label}
                    name={field.name}
                    type={field.name === "password" ? "password" : "text"}
                    value={values[field.name]}
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                  />

                  {touched[field.name] && errors[field.name] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
              <div className=" mt-3">
                <label className="text-sm">Role</label>
                <div className="relative">
                  <InputController
                    control="select"
                    className="w-full border rounded-lg p-2 "
                    value={values.roleId}
                    onChange={(e) =>
                      setFieldValue("roleId", Number(e.target.value))
                    }
                  >
                    <option value="">Select Role</option>

                    {rolesData?.roles
                      ?.filter((role: Role) => role.id !== 1)
                      ?.map((role: Role) => (
                        <option key={role.id} value={role.id}>
                          {role.title}
                        </option>
                      ))}
                  </InputController>
                  <span className="pointer-events-none absolute right-3 top-[50%] -translate-y-1/2 text-gray-500">
                    <ChevronDownIcon className="w-5 h-5" />
                  </span>
                </div>
                {touched.roleId && errors.roleId && (
                  <p className="text-xs text-red-500 mt-1">{errors.roleId}</p>
                )}
              </div>
              <div className="relative">
                <label className="text-sm">Status</label>

                <InputController
                  label="Status"
                  control="select"
                  className="w-full border rounded-lg p-2 mt-1 appearance-none pr-8"
                  value={values.isActive}
                  onChange={(e) =>
                    setFieldValue("isActive", e.target.value === "true")
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </InputController>

                <span className="pointer-events-none absolute right-3 top-[70%] -translate-y-1/2 text-gray-500">
                  <ChevronDownIcon className="w-4 h-4" />
                </span>
              </div>

              <div className=" mt-1">
                <label className="text-sm">Phone</label>
                <PhoneInput
                  value={values.phone}
                  onChange={(value) => setFieldValue("phone", value)}
                />
              </div>
            </div>
            {/* ACTIONS */}
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

export default AddEditUserModal;
