import React, { useState } from "react";

import { auth, db } from "../../components/firebase/firebase.ts";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { signupvalidationSchema } from "../../components/validations/validationSchema.ts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form } from "formik";
import { signupFields } from "../../components/formfields/formconfig.ts";
import { usepasswordtoggle } from "../../components/formfields/usepasswordtoggle.js";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import CommonModal from "../common-modal/index.tsx";
import Inputfields from "../../components/formfields/Formfields.tsx";

type NewUserModal = {
  isOpen: boolean;
  onClose: () => void;
};

const NewUserModal: React.FC<NewUserModal> = ({ isOpen, onClose }) => {
  const { showPassword, togglePassword } = usepasswordtoggle();
  const [isDisable, setisDisable] = useState(false);
  const [submitForm, setSubmitForm] = useState<() => void>(() => {});

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const secondaryApp = initializeApp(auth.app.options, "Secondary");
      const secondaryAuth = getAuth(secondaryApp);

      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        values.email,
        values.password,
      );

      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          phone: values.phone || "",
          bio: "",
          role: "new user",
          profilePhoto: "",
          createdAt: serverTimestamp(),
        });
      }

      await secondaryAuth.signOut();

      toast.success("User Registered Successfully!!", {
        position: "top-center",
        autoClose: 1000,
        onOpen: () => setisDisable(true),
        onClose: () => {
          setisDisable(false);
          onClose();
        },
      });

      onClose();
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        onOpen: () => setisDisable(true),
        onClose: () => setisDisable(false),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => submitForm()}
      submitLabel="Add"
      cancelLabel="Cancel"
      title="Add Account"
      submitDisabled={isDisable}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          profilePhoto: null,
        }}
        validationSchema={signupvalidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          submitForm,
          isSubmitting,
        }) => {
          setSubmitForm(() => submitForm);

          return (
            <Form className="space-y-6">
              {signupFields.map((field) => (
                <div key={field.name} className="relative">
                  <Inputfields
                    id={field.name}
                    name={field.name}
                    type={
                      field.type === "password"
                        ? showPassword[field.name]
                          ? "text"
                          : "password"
                        : field.type
                    }
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

                  {field.type === "password" && (
                    <div
                      onClick={() => togglePassword(field.name)}
                      className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                    >
                      {showPassword[field.name] ? <HiEyeOff /> : <HiEye />}
                    </div>
                  )}
                </div>
              ))}
            </Form>
          );
        }}
      </Formik>
    </CommonModal>
  );
};

export default NewUserModal;
