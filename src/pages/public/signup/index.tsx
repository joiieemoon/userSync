import loginCover from "../../../../public/logincover.png";
import { signupFields } from "../../../components/common/input/form-fields/formconfig";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { auth, db } from "../../../services/firebase/firebase.ts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupvalidationSchema } from "../../../utils/validations/validation-schema/index.ts";
import { useState } from "react";

import Commanbutton from "../../../components/common/button";
import FormController from "../../../components/common/input/form-controller/index.tsx";
import { usersService } from "../../../services/rest-api-services/user-services/index.ts";
export const Signup = () => {
  const [isDisable, setisDisable] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      <div className="flex-1 flex items-center justify-center p-6">
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
              const userCreadential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password,
              );
              const user = userCreadential.user;

              if (user) {
                // await usersService.create(user.uid, {
                await usersService.create(user.uid, {
                  email: user.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  password: values.password,
                  role: "user",
                  profilePhoto: "",
                  createdAt: serverTimestamp(),
                });
              }

              console.log("user registerd", user);

              toast.success("User Registerd Successfully!!", {
                position: "top-center",
                onClose: () => setisDisable(false),
              });
              navigate("/");
            } catch (error) {
              console.log(error);
              toast.error(error.message, {
                position: "top-center",
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

            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white/80  p-9  rounded-2xl shadow-2xl space-y-5 relative"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold ">Create Account</h2>
                <p className="text-gray-500  text-sm mt-1">
                  Please create your account
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {signupFields.map((field) => (
                  <div
                    key={field.name}
                    className={`relative mt-1 ${
                      field.name === "email" ? "col-span-2" : ""
                    }`}
                  >
                    <FormController
                      control="input"
                      label={field.label}
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={values[field.name as keyof typeof values]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isDisable}
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
                  </div>
                ))}
              </div>

              <Commanbutton
                type="submit"
                disabled={isSubmitting || isDisable}
                label={isSubmitting || isDisable ? "Sign up......" : "Sign up"}
                icon=""
                variant="main"
              />

              <span className="dark:text-black">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>

      {/* Image Side */}
      <div className="hidden md:flex flex-1">
        <img
          src={loginCover}
          alt="signup cover"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};
