import { useModal } from "../../../../hooks/usemodal/index.ts";
import { Modal } from "../../../../components/ui/modal/index.tsx";

import Button from "../../../../components/ui/button/index.tsx";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { updateprofilevaldiation } from "../../../../components/ui/input/validation/index.ts";
import { useAuth } from "../../../auth/hooks/useAuth/index.tsx";
import { updateFields } from "../../../../components/ui/input/input-config/index.ts";
import {
  useGetProfilebyid,
  useUpdateProfile,
} from "../../hooks/update-profile/index.tsx";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import InputController from "../../../../components/ui/input/input-controller/index.tsx";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../../../user/types/index.ts";
type Profile = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roleTitle?: string;
  };
};
export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate, isPending } = useUpdateProfile();

  const { updateUser } = useAuth();

  // const { data: profile } = useGetProfilebyid<Profile>();
  const { data: profile } = useGetProfilebyid();
  const queryClient = useQueryClient();
  const typedProfile = profile as Profile;
  // const profileUser = profile?.user;
  const profileUser = typedProfile?.user;

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(updateprofilevaldiation),
    mode: "all",
  });
  const onSubmit = (values: Partial<User>) => {
    mutate(values, {
      onSuccess: () => {
        closeModal();
        updateUser(values);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast.success("Profile updated successfully");
      },
      onError: (error: unknown) => {
        Sentry.captureException(error);
        const err = error as {
          response?: { data?: { message?: string } };
        };
        toast.error(err?.response?.data?.message || "Update failed");
      },
    });
  };

  useEffect(() => {
    if (profileUser) {
      reset({
        firstName: profileUser.firstName || "",
        lastName: profileUser.lastName || "",
        email: profileUser.email || "",

        phone: profileUser.phone || "",
      });
    }
  }, [profileUser, reset]);
  // console.log(profileUser,);
  return (
    <>
      <div className="p-10 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src="/images/user/owner.jpg" alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {profileUser?.firstName || "Guest"} {profileUser?.lastName}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profileUser?.email}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

                <p className="text-sm text-gray-500 dark:text-gray-400 font-extrabold">
                  {profileUser?.roleTitle}
                  {profileUser?.roleTitle}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        title="Update Profile"
        onClose={closeModal}
        className="max-w-[700px] m-4"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-5">
          <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 ">
            <div className="mt-2">
              <h5 className=" text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Personal Information
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                {updateFields.map((field) => {
                  const isHalf =
                    field.name === "firstName" || field.name === "lastName";

                  return (
                    <div
                      key={field.name}
                      className={
                        isHalf ? "col-span-2 lg:col-span-1" : "col-span-2"
                      }
                    >
                      {/* <InputController
                        control="input"
                        label={field.label}
                        // name={field.name as keyof typeof values}
                        type={field.type}
                        placeholder={field.placeholder}
                        // value={values[field.name as keyof typeof values]}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        registration={register(field.name)}
                        error={!!errors[field.name as keyof typeof values]}
                        // errorMessage={
                        //   errors[field.name as keyof typeof values]
                        //     ? String(errors[field.name as keyof typeof values])
                        //     : ""
                        // }
                        errorMessage={
                          errors[field.name as keyof typeof errors]
                            ?.message && (
                            <p className="text-xs text-red-500 mt-1">
                              {
                                errors[field.name as keyof typeof errors]
                                  ?.message as string
                              }
                            </p>
                          )
                        }
                      /> */}

                      <InputController
                        control="input"
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        registration={register(field.name)}
                        error={!!errors[field.name as keyof typeof errors]}
                        errorMessage={
                          errors[field.name as keyof typeof errors]
                            ?.message as string
                        }
                      />
                    </div>
                  );
                })}

                <div className="col-span-2 lg:col-span-2">
                  <label className="text-sm">Phone</label>
                  <div
                    className={` w-full rounded-lg  ${
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
                          inputClass="!w-full !h-11 !text-sm bg-red"
                          containerClass=" !w-full"
                        />
                      )}
                    />
                  </div>

                  {errors.phone && (
                    <p className="text-xs text-red-500 ">
                      {String(errors.phone.message)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2  lg:justify-end mb-2 ">
            <Button
              size="sm"
              variant="outline"
              onClick={closeModal}
              type="button"
            >
              Close
            </Button>
            <Button size="sm" type="submit" disabled={isPending}>
              {isPending ? "saving...." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
