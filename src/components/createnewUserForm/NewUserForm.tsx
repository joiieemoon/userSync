// import React from 'react';
import React, { useState } from "react";

import { auth, db } from "../../components/firebase/firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { signupvalidationSchema } from "../../components/validations/validationSchema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { signupFields } from "../../components/formfields/formconfig";
import { usepasswordtoggle } from "../../components/formfields/usepasswordtoggle.js";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FileInput } from "flowbite-react";

type NewUserFormProps = {
  onClose: () => void;
};
const NewUserForm: React.FC<NewUserFormProps> = ({ onClose }) => {
  const { showPassword, togglePassword } = usepasswordtoggle();
  const [isClose, setisClose] = useState(false);
  const [isDisable, setisDisable] = useState(false);

  return (
    <div className="flex justify-center items-center  bg-gray-100  rounded-2xl">
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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Secondary app create
            const secondaryApp = initializeApp(auth.app.options, "Secondary");
            const secondaryAuth = getAuth(secondaryApp);

            // New user create
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

            // Secondary auth logout
            await secondaryAuth.signOut();

            toast.success("User Registered Successfully!!", {
              position: "top-center",
              
            onClose: () => setisDisable(false),
            autoClose: 2000,
            });
          } catch (error: any) {
            toast.error(error.message, {
              position: "top-center",
            
               onClose: () => setisDisable(false),
                 autoClose: 3000,
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          isSubmitting
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md bg-white/90  p-10 rounded-2xl shadow-2xl space-y-6"
          >
            <ToastContainer position="top-center" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition cursor-pointer"
            >
              <IoClose className="text-2xl" />
            </button>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold  mb-1">Add Account</h2>
              <p className="text-gray-500  text-sm">
                Please create your account
              </p>
            </div>

            {/* Form Fields */}
            {signupFields.map((field) => (
              <div key={field.name} className="relative">
                <Label
                  htmlFor={field.name}
                  className="text-black dark:text-black "
                >
                  {field.label}
                </Label>

                {field.type === "file" ? (
                  <FileInput
                    id={field.name}
                    name={field.name}
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue(field.name, e.currentTarget.files?.[0])
                    }
                    className="
    mt-1
    !bg-white
    !text-black
    !border-gray-300
    dark:!bg-white
    dark:!text-black
    dark:!border-gray-300
  "
                  />
                ) : (
                  <TextInput
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
                    className="
    mt-1
    !bg-white !text-black !border-gray-300 !placeholder-gray-400
    dark:!bg-white dark:!text-black dark:!border-gray-300 dark:!placeholder-gray-400
  "
                  />
                )}

                {/* Password Toggle */}
                {field.type === "password" && (
                  <button
                    type="button"
                    onClick={() => togglePassword(field.name)}
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700  cursor-pointer transition"
                  >
                    {showPassword[field.name] ? <HiEyeOff /> : <HiEye />}
                  </button>
                )}

                {/* Validation Error */}
                {errors[field.name as keyof typeof errors] &&
                  touched[field.name as keyof typeof touched] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name as keyof typeof errors]}
                    </p>
                  )}
              </div>
            ))}

            {/* Submit Button */}
            <Button
            disabled={isSubmitting || isDisable}
              type="submit"
              className="w-full bg-amber-300 text-black hover:bg-amber-400 cursor-pointer"
            >
             {isSubmitting || isDisable ? "Adding..." : "Add"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewUserForm;
