import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase/firebase.ts";
import {
  setDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import CommonModal from "../../components/common/common-modal/index.tsx";

import {
  editUserFields,
  signupFields,
} from "../../components/common/input/form-fields/formconfig.ts";

import {
  updateProfileValidationSchema,
  signupvalidationSchema,
} from "../../utils/validations/validation-schema/index.ts";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import FormController from "../../components/common/input/form-controller/index.tsx";

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
};

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  user = null,
}) => {
  const isEditMode = !!user;
  const [roles, setRoles] = useState<{ id: string; roleName: string }[]>([]);
  const [submitForm, setSubmitForm] = useState<() => void>(() => {});

  const [isDisable, setIsDisable] = useState(false);

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

  if (!isOpen) return null;

  const initialValues = isEditMode
    ? editUserFields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: user![field.name as keyof typeof user] || "",
        }),
        {} as Record<string, string>,
      )
    : {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePhoto: null,
        role: "new user",
        phone: "",
      };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any,
  ) => {
    try {
      if (isEditMode && user) {
        await updateDoc(doc(db, "Users", user.uid), values);
        toast.success("User updated successfully", { position: "top-center" });
      } else {
        const secondaryApp = initializeApp(auth.app.options, "Secondary");
        const secondaryAuth = getAuth(secondaryApp);

        const userCredential = await createUserWithEmailAndPassword(
          secondaryAuth,
          values.email,
          values.password,
        );

        const newUser = userCredential.user;

        if (newUser) {
          await setDoc(doc(db, "Users", newUser.uid), {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            phone: values.phone || "",
            bio: "",
            role: values.role || "new user",
            profilePhoto: "",
            createdAt: serverTimestamp(),
          });
        }

        await secondaryAuth.signOut();

        toast.success("User Registered Successfully!!", {
          position: "top-center",
          autoClose: 1000,
          onOpen: () => setIsDisable(true),
          onClose: () => {
            setIsDisable(false);
            onClose();
          },
        });
      }

      onClose();
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => submitForm()}
      submitLabel={isEditMode ? "Save" : "Add"}
      cancelLabel="Cancel"
      submitDisabled={isDisable}
      title={isEditMode ? `Edit User ${user?.firstName}` : "Add Account"}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={
          isEditMode ? updateProfileValidationSchema : signupvalidationSchema
        }
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

          const fieldsToRender = isEditMode ? editUserFields : signupFields;

          return (
            <Form className="space-y-4">
              {fieldsToRender.map((field) => {
                if (field.name === "role") {
                  return (
                    <FormController
                      key={field.name}
                      control="select"
                      label={field.label}
                      name={field.name}
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.role && !!errors.role}
                      errorMessage={errors.role}
                      disabled={user?.role === "admin"}
                    >
                      <option value="">Select Role</option>
                      {roles
                        .filter((r) => r.roleName.toLowerCase() !== "admin")
                        .map((role) => (
                          <option key={role.id} value={role.roleName}>
                            {role.roleName}
                          </option>
                        ))}
                    </FormController>
                  );
                }

                return (
                  <FormController
                    key={field.name}
                    control="input"
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={values[field.name as keyof typeof values]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={field.label}
                    error={
                      !!(
                        errors[field.name as keyof typeof errors] &&
                        touched[field.name as keyof typeof touched]
                      )
                    }
                    errorMessage={
                      errors[field.name as keyof typeof errors] as string
                    }
                  />
                );
              })}
            </Form>
          );
        }}
      </Formik>
    </CommonModal>
  );
};

export default UserModal;
