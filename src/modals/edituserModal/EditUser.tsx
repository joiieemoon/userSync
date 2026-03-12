import React, { useEffect, useState } from "react";
import { db } from "../../components/firebase/firebase.ts";
import { updateDoc, doc, collection, getDocs } from "firebase/firestore";
import { Formik, Form } from "formik";
import { updateProfileValidationSchema } from "../../components/validations/validationSchema";
import { toast } from "react-toastify";
import EditBtn from "../../components/button/editbutton/Editbtn.tsx";
import Inputfields from "../../components/formfields/Formfields.tsx";
import { editUserFields } from "../../components/formfields/formconfig.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
};

const EditUser: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const [roles, setRoles] = useState<{ id: string; roleName: string }[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const querySnapshot = await getDocs(collection(db, "roles"));
      const roleList = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        roleName: docSnap.data().roleName,
      }));
      setRoles(roleList);
    };
    fetchRoles();
  }, []);

  if (!isOpen || !user) return null;

  const initialValues = editUserFields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: user[field.name as keyof typeof user] || "",
    }),
    {} as Record<string, string>,
  );

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any,
  ) => {
    try {
      await updateDoc(doc(db, "Users", user.uid), values);
      toast.success("User updated successfully", { position: "top-center" });
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user", { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Edit User {user.firstName}
        </h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={updateProfileValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="space-y-4">
              {editUserFields.map((field) =>
                field.name === "role" ? (
                  <Inputfields
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    as="select"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.role && !!errors.role}
                    errorMessage={errors.role}
                    disabled={user.role === "admin"}
                  >
                    <option value="">Select Role</option>
                    {roles
                      .filter((r) => r.roleName.toLowerCase() !== "admin")
                      .map((role) => (
                        <option key={role.id} value={role.roleName}>
                          {role.roleName}
                        </option>
                      ))}
                  </Inputfields>
                ) : (
                  <Inputfields
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched[field.name] && !!errors[field.name]}
                    errorMessage={errors[field.name]}
                  />
                ),
              )}

              <div className="flex justify-end gap-3">
                <EditBtn
                  onClick={onClose}
                  type="button"
                  label="Cancel"
                  icon=""
                  variant="secondary"
                />
                <EditBtn
                  disabled={isSubmitting}
                  type="submit"
                  label={isSubmitting ? "Saving..." : "Save"}
                  icon=""
                  variant="primary"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUser;
