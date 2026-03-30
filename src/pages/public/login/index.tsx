import loginCover from "../../../../public/logincover.png";
import { loginFields } from "../../../components/common/input/form-fields/formconfig/index.ts";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { auth } from "../../../services/firebase/firebase.ts";
import { loginvalidationSchema } from "../../../utils/validations/validation-schema/index.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import ForgotPassword from "../../../modals/forget-password-modal";

import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slice/auth-slice/index.ts";
import type { AppDispatch } from "../../../redux/store/index.ts";

import { setUserPermissions } from "../../../redux/slice/permission-slice/index.ts";

import Commanbutton from "../../../components/common/button";
import FormController from "../../../components/common/input/form-controller/index.tsx";

import { usersService } from "../../../services/rest-api-services/user-services/index.ts";
import { roleService } from "../../../services/rest-api-services/role-services/index.ts";

export const Login = () => {
  const [showForgot, setShowForgot] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isDisable, setisDisable] = useState(false);

  const generateAvatar = (name: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden ">
      <div className="flex-1 flex items-center justify-center p-6">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginvalidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password,
              );
              const user = userCredential.user;

              if (user) {
                const data = await usersService.getById(user.uid);

                if (data) {
                  const fullName = `${data.firstName} ${data.lastName}`;
                  let profilePhoto = data.profilePhoto;

                  if (!profilePhoto || profilePhoto.trim() === "") {
                    profilePhoto = generateAvatar(fullName);
                    await usersService.update(user.uid, { profilePhoto });
                  }

                  let rolePermissions = {};
                  if (data.role) {
                    const roleData = await roleService.getUsersByRole(
                      data.role,
                    );
                    rolePermissions = roleData?.permissions || {};
                  }
                  dispatch(
                    setUser({
                      uid: user.uid,
                      firstName: data.firstName,
                      lastName: data.lastName,
                      email: data.email,
                      profilePhoto:
                        data.profilePhoto?.trim() ||
                        generateAvatar(`${data.firstName} ${data.lastName}`),
                      role: data.role || "User",
                      phone: data.phone || "",
                      bio: data.bio || "",
                    }),
                  );

                  dispatch(
                    setUserPermissions({
                      username: data.firstName,
                      permissions: rolePermissions,
                    }),
                  );
                }
              }

              toast.success("User Login Successfully!!", {
                position: "top-center",
                onClose: () => setisDisable(false),
              });
            } catch (error: any) {
              const cleanMessage =
                error.message?.replace("Firebase:", "").trim() ||
                "Login failed";
              setisDisable(true);
              toast.error("Login failed! " + cleanMessage, {
                position: "top-center",
                autoClose: 2000,
                onClose: () => setisDisable(false),
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            handleSubmit,
            errors,
            handleChange,
            handleBlur,
            touched,
            isSubmitting,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white/80 p-10 rounded-2xl shadow-2xl space-y-5"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold ">Welcome Back</h2>
              </div>

              {loginFields.map((field) => (
                <div key={field.name} className="relative">
                  <FormController
                    control="input"
                    label={field.label}
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={values[field.name as keyof typeof values]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
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

              <div className="flex justify-center items-center">
                <Commanbutton
                  type="submit"
                  disabled={isSubmitting || isDisable}
                  label={isSubmitting || isDisable ? "Login..." : "Login"}
                  icon=""
                  variant="main"
                />
              </div>

              <span className="">
                New user ?{" "}
                <Link to="/signup" className="text-blue-600">
                  Sign Up
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>

      <ForgotPassword
        isOpen={showForgot}
        onClose={() => setShowForgot(false)}
        onSubmit={(email) => {
          console.log("Reset email:", email);
          setShowForgot(false);
        }}
      />

      <div className="hidden md:flex flex-1">
        <img
          src={loginCover}
          alt="usersync"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};
