import React, { useEffect, useState } from "react";
import { db } from "../../components/firebase/firebase.ts";
import { updateDoc, doc, collection, getDocs } from "firebase/firestore";
import { Formik, Form } from "formik";
import { updateProfileValidationSchema } from "../../components/validations/validationSchema";
import { toast } from "react-toastify";
import Inputfields from "../../components/formfields/Formfields.tsx";
import { editUserFields } from "../../components/formfields/formconfig.ts";
import CommonModal from "../common-modal/index.tsx";

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
  const [submitForm, setSubmitForm] = useState<() => void>(() => {});

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
      console.log("hiudsif");
      onClose();
    } catch (error) {
      toast.error("Failed to update user", { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => submitForm()}
      submitLabel="Save"
      cancelLabel="Cancel"
      title={`Edit User ${user.firstName}`}
    >
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
          submitForm,
        }) => {
          setSubmitForm(() => submitForm);

          return (
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
            </Form>
          );
        }}
      </Formik>
    </CommonModal>
  );
};

export default EditUser;
