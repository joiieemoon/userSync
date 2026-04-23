// import React from "react";
import { Modal } from "../../../../components/ui/modal";
import { Formik, Form } from "formik";

import { updateprofilevaldiation } from "../../../../components/ui/input/validation";
import Button from "../../../../components/ui/button/Button";
import InputController from "../../../../components/ui/input/input-controller";
import { updateuserFiels } from "../../../../components/ui/input/input-config";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useGetUserById, useUpdateUser } from "../../hooks/uselistusers-api";

const AddEditUserModal = ({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}) => {
  console.log("this is id", id);

  const { data: user, isLoading } = useGetUserById(id);

  const { mutate: updateUser, isPending } = useUpdateUser();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4"
      title="Update User"
    >
      <Formik
        enableReinitialize
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          phone: user?.phone || "",
          username: user?.username || "",
          isActive: user?.isActive ?? true,
        }}
        onSubmit={(values, { resetForm }) => {
          updateUser(
            {
              id,
              data: values,
            },
            {
              onSuccess: () => {
                toast.success("User updated successfully ");
                resetForm();
                onClose();
              },
              onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Update failed ");
              },
            },
          );
        }}
        validationSchema={updateprofilevaldiation}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form className="flex flex-col mx-5">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-1">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Update User Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  {updateuserFiels.map((field) => {
                    const isHalf =
                      field.name === "firstName" ||
                      field.name === "lastName" ||
                      field.name === "username";

                    return (
                      <div
                        key={field.name}
                        className={
                          isHalf ? "col-span-2 lg:col-span-1" : "col-span-2"
                        }
                      >
                        <InputController
                          control="input"
                          label={field.label}
                          name={field.name}
                          type={field.type}
                          value={values[field.name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(errors[field.name] && touched[field.name])}
                          errorMessage={errors[field.name]}
                        />
                      </div>
                    );
                  })}
                  <div className="col-span-2 lg:col-span-1  pt-1 mt-2 ">
                    <label className="text-sm">Status</label>
                    <div
                      className={` w-full rounded-lg  cursor-pointer ${
                        touched.phone && errors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <InputController
                        control="select"
                        name="isActive"
                        value={values.isActive}
                        onChange={(e) =>
                          setFieldValue("isActive", e.target.value === "true")
                        }
                      >
                        <option
                          value="true"
                          className="rounded-xl border-gray-300 bg-blue-100 !cursor-pointer"
                        >
                          Active
                        </option>
                        <option
                          value="false"
                          className="bg-red-100 !cursor-pointer"
                        >
                          Inactive
                        </option>
                      </InputController>
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-2">
                    <label className="text-sm">Phone</label>
                    <div
                      className={`mt-2 w-full rounded-lg border ${
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
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end mb-8">
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                type="button"
              >
                Close
              </Button>
              <Button size="sm" type="submit" disabled={isPending}>
                {isPending ? "saving...." : "Save Changes"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddEditUserModal;
