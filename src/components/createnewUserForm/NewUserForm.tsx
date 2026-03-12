import React, { useState } from "react";
import { auth, db } from "../firebase/firebase.ts";
import { ToastContainer, toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { signupvalidationSchema } from "../../components/validations/validationSchema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form } from "formik";
import { signupFields } from "../../components/formfields/formconfig";
import { usepasswordtoggle } from "../../components/formfields/usepasswordtoggle.js";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import EditBtn from "../button/editbutton/Editbtn.tsx";
import Inputfields from "../formfields/Formfields.tsx";

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
              autoClose: 1000,
              onOpen: () => setisDisable(true),

              onClose: () => {
                setisDisable(false);
                setisClose(true);
                onClose();
              },
            });
          } catch (error) {
            setisDisable(true);
            toast.error(error.message, {
              position: "top-center",

              onOpen: () => setisDisable(true),
              onClose: () => setisDisable(false),
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
          isSubmitting,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md bg-white/90  p-10 rounded-2xl shadow-2xl space-y-6"
          >
            <ToastContainer position="top-center" />

           

            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold  mb-1">Add Account </h2>
              <p className="text-gray-500  text-sm">
                Please create your account
              </p>
            </div>

            {/* Form Fields */}
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
                  className="mt-1"
                />

                {/* Password toggle button */}
                {field.type === "password" && (
                  <div
                    type="button"
                    onClick={() => togglePassword(field.name)}
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 cursor-pointer transition"
                  >
                    {showPassword[field.name] ? <HiEyeOff /> : <HiEye />}
                  </div>
                )}
              </div>
            ))}
            <div className="flex w-full justify-evenly">  <EditBtn
              onClick={onClose}
              type="button"
              label="cancel"
              icon=""
              variant="secondary"
            />
            {/* Submit Button */}

            <EditBtn
              type="submit"
              disabled={isSubmitting || isDisable}
              label={isSubmitting || isDisable ? "Adding..." : "Add"}
              icon=""
              variant="primary"
            /></div>
          
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewUserForm;
