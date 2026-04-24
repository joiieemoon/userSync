import { Link } from "react-router";
import { Formik, Form } from "formik";

import { ChevronLeftIcon } from "../../../../assets/icons/index.ts";
import Button from "../../../../components/ui/button/Button.tsx";
import { useState } from "react";
import { loginFields } from "../../../../components/ui/input/input-config/index.ts";

import InputController from "../../../../components/ui/input/input-controller/index.tsx";
import { loginvalidationSchema } from "../../../../components/ui/input/validation/index.ts";

import { useLogin } from "../../hooks/uselogin-singup/index.tsx";

import { toast } from "react-toastify";
import { loginProps } from "../../types/index.tsx";
export default function SignInForm() {
  const { mutate, isPending } = useLogin();
  const [lock, setLock] = useState(false);
  const handleSubmit = (values: loginProps) => {
    if (lock) return;

    setLock(true);

    mutate(values, {
      onSuccess: () => {
        toast.success("Login successful");

        setTimeout(() => {
          setLock(false);
        }, 5000);
      },

      onError: (error) => {
        const message =
          error?.response?.data?.message || "Something went wrong";

        toast.error(message);

        setTimeout(() => {
          setLock(false);
        }, 5000);
      },
    });
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5"></div>
            <div className="relative py-3 sm:py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
            </div>
            {/* <form> */}

            <div className="space-y-6 mt-3">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginvalidationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  touched,
                  errors,

                  handleBlur,
                  handleChange,
                }) => (
                  <Form>
                    {loginFields.map((field) => (
                      <div key={field.name} className="relative">
                        <InputController
                          control="input"
                          label={field.label}
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          value={values[field.name as keyof typeof values]}
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
                            errors[field.name as keyof typeof errors] as string
                          }
                        />
                      </div>
                    ))}

                    <div className="mt-5">
                      <Button
                        className="w-full"
                        size="sm"
                        type="submit"
                        disabled={isPending || lock}
                      >
                        {isPending ? "Signing in..." : "Sign in"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            {/* </form> */}

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
