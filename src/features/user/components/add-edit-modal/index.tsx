import { Modal } from "../../../../components/ui/modal";
import { Formik, Form } from "formik";
import Button from "../../../../components/ui/button/Button";
import InputController from "../../../../components/ui/input/input-controller";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import {
  useGetUserById,
  useUpdateUser,
  useCreateUser,
} from "../../hooks/uselistusers-api";
import {
  updateprofilevaldiation,
  updateUserValidation,
} from "../../../../components/ui/input/validation";
import { useListRoles } from "../../../roles/hooks";

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
            {/* FORM GRID */}
            <div className="grid grid-cols-2 gap-5 mt-6">
              {/* First Name */}
              <InputController
                control="input"
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={(e: any) =>
                  setFieldValue("firstName", e.target.value)
                }
              />

              {/* Last Name */}
              <InputController
                control="input"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={(e: any) => setFieldValue("lastName", e.target.value)}
              />

              {/* Username */}
              <InputController
                control="input"
                label="Username"
                name="username"
                value={values.username}
                onChange={(e: any) => setFieldValue("username", e.target.value)}
              />

              {/* Email */}
              <InputController
                control="input"
                label="Email"
                name="email"
                value={values.email}
                onChange={(e: any) => setFieldValue("email", e.target.value)}
              />

              <InputController
                control="input"
                label={!id ? "Password" : "Reset Password"}
                name="password"
                type="password"
                value={values.password}
                onChange={(e: any) => setFieldValue("password", e.target.value)}
              />

              <div>
                <label className="text-sm">Role</label>

                <InputController
                  control="select"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={values.roleId}
                  onChange={(e: any) =>
                    setFieldValue("roleId", Number(e.target.value))
                  }
                >
                  <option value="">Select Role</option>

                  {rolesData?.roles
                    ?.filter((role: any) => role.id !== 1)
                    ?.map((role: any) => (
                      <option key={role.id} value={role.id}>
                        {role.title}
                      </option>
                    ))}
                </InputController>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm">Status</label>
                <InputController
                  control="select"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={values.isActive}
                  onChange={(e) =>
                    setFieldValue("isActive", e.target.value === "true")
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </InputController>
              </div>
              <div className="mt-5">
                <label className="text-sm">Phone</label>
                <PhoneInput
                  country={"in"}
                  value={values.phone}
                  onChange={(phone) => setFieldValue("phone", phone)}
                  inputClass="!w-full !border !rounded-lg"
                />

                {touched.phone && errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* PHONE */}

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
