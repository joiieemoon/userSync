import { Link } from "react-router";
import { ChevronLeftIcon } from "../../../../assets/icons";

import { Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { signupvalidationSchema } from "../../../../components/ui/input/validation";
import { signupFields } from "../../../../components/ui/input/input-config";
import InputController from "../../../../components/ui/input/input-controller";
import Button from "../../../../components/ui/button/Button";

import { useSignUp } from "../../hooks/uselogin-singup";
import { useState } from "react";
import { toast } from "react-toastify";
import { SignupProps } from "../../types";
export default function SignUpForm() {
  const [lock, setLock] = useState(false);
  const { mutate, isPending } = useSignUp();
  const handleSubmit = (values: SignupProps, { setErrors }) => {
    if (lock) return;

    setLock(true);

    mutate(values, {
      onSuccess: () => {
        toast.success("Signup successful");

        setTimeout(() => {
          setLock(false);
        }, 5000);
      },

      onError: (error) => {
        const data = error?.response?.data;

        if (data?.message) {
          toast.error(data.message);
        }

        if (data?.errors && Array.isArray(data.errors)) {
          const formErrors = {};

          data.errors.forEach((err) => {
            formErrors[err.field] = err.message;
          });

          setErrors(formErrors);
        }

        setTimeout(() => {
          setLock(false);
        }, 5000);
      },
    });
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
            </div>

            <div className="abosulate">
              <Formik
                initialValues={{
                  email: "",
                  firstName: "",
                  lastName: "",
                  password: "",
                  username: "",
                  phone: "",
                }}
                validationSchema={signupvalidationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  touched,
                  errors,

                  handleBlur,
                  handleChange,
                  setFieldValue,
                  setFieldTouched,
                  setErrors,
                }) => (
                  <Form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {signupFields.map((field) => {
                        const isHalf =
                          field.name === "firstName" ||
                          field.name === "lastName" ||
                          field.name === "username";
                        // field.name === "phone";

                        return (
                          <div
                            key={field.name}
                            className={isHalf ? "" : "sm:col-span-2"}
                          >
                            <InputController
                              control="input"
                              label={field.label}
                              name={field.name}
                              value={values[field.name as keyof typeof values]}
                              type={field.type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={field.placeholder}
                              disabled={lock}
                              error={
                                !!(
                                  errors[field.name as keyof typeof errors] &&
                                  touched[field.name as keyof typeof touched]
                                )
                              }
                              errorMessage={
                                errors[
                                  field.name as keyof typeof errors
                                ] as string
                              }
                            />
                          </div>
                        );
                      })}
                      <div>
                        <label htmlFor="" className="text-sm">
                          Phone
                        </label>
                        <div
                          className={`mt-4 w-full rounded-lg border ${
                            touched.phone && errors.phone
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <PhoneInput
                            country={"in"}
                            value={values.phone}
                            onChange={(phone) => setFieldValue("phone", phone)}
                            onBlur={() => setFieldTouched("phone", true)}
                            inputClass="!w-full !border-0 !text-sm"
                          />
                        </div>
                        {touched.phone && errors.phone && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full mt-5"
                      size="sm"
                      type="submit"
                      disabled={lock}
                    >
                      {isPending ? "Sign Up..." : " Sign Up"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
