import { Link } from "react-router";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { signupvalidationSchema } from "../../../../components/ui/input/validation";
import { signupFields } from "../../../../components/ui/input/input-config";
import InputController from "../../../../components/ui/input/input-controller";
import Button from "../../../../components/ui/button";
import * as Sentry from "@sentry/react";
import { useSignUp } from "../../hooks/uselogin-singup";
import { useState } from "react";
import { toast } from "react-toastify";
import { SignupProps } from "../../types";
import PageMeta from "../../../../components/common/page-meta";
import { SignupPropsform } from "../../../../components/ui/input/validation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
export default function SignUpForm() {
  const [lock, setLock] = useState(false);
  const { mutate, isPending } = useSignUp();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SignupPropsform>({
    resolver: zodResolver(signupvalidationSchema),
    mode: "all",
  });
  const onSubmit = (
    values: SignupProps,
    // { setErrors }: FormikHelpers<SignupProps>,
  ) => {
    if (lock) return;

    setLock(true);

    mutate(values, {
      onSuccess: () => {
        setTimeout(() => {
          setLock(false);
        }, 5000);
      },

      onError: (error: Error) => {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              errors?: { field: string; message: string }[];
            };
          };
        };
        const data = axiosError?.response?.data;

        Sentry.captureException(error);
        if (data?.message) {
          toast.error(data.message);
        }

        if (data?.errors && Array.isArray(data.errors)) {
          const formErrors: Record<string, string> = {};

          data.errors.forEach((err) => {
            formErrors[err.field] = err.message;
          });

          // setErrors(formErrors);
        }

        setTimeout(() => {
          setLock(false);
        }, 5000);
      },
    });
  };

  return (
    <>
      <PageMeta
        title="UserDesk | Signup"
        description="this is signup for register new user in userdes"
      ></PageMeta>
      <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {signupFields.map((field) => {
                      const isHalf =
                        field.name === "firstName" ||
                        field.name === "lastName" ||
                        field.name == "password" ||
                        field.name === "username" ||
                        field.name === "cpassword";

                      return (
                        <div
                          key={field.name}
                          className={isHalf ? "" : "sm:col-span-2"}
                        >
                          <InputController
                            control="input"
                            label={field.label}
                            name={field.name}
                            autoComplete={field?.autoComplete}
                            registration={register(
                              field.name as keyof SignupPropsform,
                            )}
                            type={field.type}
                            placeholder={field.placeholder}
                            disabled={lock}
                            error={
                              !!(
                                errors[field.name as keyof typeof errors]
                              )
                            }
                            errorMessage={
                              errors[field.name as keyof typeof errors]?.message
                            }
                          />
                        </div>
                      );
                    })}
                    {/* <div>
                      <label htmlFor="" className="text-sm">
                        Phone
                      </label>
                      <div
                        className={`mt-4 w-full rounded-lg border ${
                          touchedFields.phone && errors.phone
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
                      {touchedFields.phone && errors.phone && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div> */}

                    <div>
                      <label className="text-sm">Phone</label>
                      <div
                        className={`mt-4 w-full rounded-lg  ${
                          touchedFields.phone && errors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <Controller
                          name="phone"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <PhoneInput
                              country={"in"}
                              value={field.value}
                              onChange={(phone) => field.onChange(phone)}
                              onBlur={field.onBlur}
                              disabled={lock}
                              inputClass="!w-full !h-11 !text-sm bg-red"
                              containerClass="mt-2 !w-full"
                            />
                          )}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone.message}
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
                </form>
                {/* )}
                </Formik> */}
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
    </>
  );
}
