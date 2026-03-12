import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/firebase/firebase.ts";
import { updateUser } from "../../redux/store/authSlice";
import type { AppDispatch } from "../../redux/store/store";
import { toast } from "react-toastify";
import { FileInput } from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";
import { updateProfileValidationSchema } from "../../../src/components/validations/validationSchema";
import { Formik, Form } from "formik";
import avatar from "../../../public/avtar.png";


import Inputfields from "../../components/formfields/Formfields.tsx";
import CommonModal from "../common-modal/index.tsx";
interface Props {
  user: {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role?: string;
    bio?: string;
    profilePhoto?: string;
  };
  onClose: () => void;
}


export default function UpdateProfileModal({ user, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "",
    bio: user.bio || "",
    profilePhoto: user.profilePhoto || "",
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      let photoURL = values.profilePhoto;

      if (selectedFile) {
        photoURL = await convertToBase64(selectedFile);
      }

      const updatedData = {
        ...values,
        profilePhoto: photoURL,
      };

      await updateDoc(doc(db, "Users", user.uid), updatedData);
      dispatch(updateUser(updatedData));

      toast.success("Profile updated successfully!", {
        position: "top-center",
      });

      onClose();
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateProfileValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => (
        <CommonModal
          isOpen={true}
          onClose={onClose}
          onSubmit={handleSubmit}
          submitLabel={isSubmitting ? "Saving..." : "Save Changes"}
          cancelLabel="Cancel"
          submitDisabled={isSubmitting}
          className="max-w-3xl w-full overflow-y-auto"
          title="Update Profile"
        >
          <Form className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
              alt="profilePhoto"
                src={preview || values.profilePhoto || avatar}
                className="w-24 h-24 rounded-full object-cover border"
              />

              <FileInput
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    setPreview(URL.createObjectURL(file));
                    setFieldValue("profilePhoto", file);
                  }
                }}
              />

              {errors.profilePhoto && touched.profilePhoto && (
                <p className="text-red-500 text-xs">{errors.profilePhoto}</p>
              )}
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {["firstName", "lastName", "email", "phone"].map((field) => (
                <Inputfields
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={values[field as keyof typeof values]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    !!(
                      errors[field as keyof typeof errors] &&
                      touched[field as keyof typeof touched]
                    )
                  }
                  errorMessage={errors[field as keyof typeof errors] as string}
                />
              ))}

              <Inputfields
                label="Bio"
                name="bio"
                as="textarea"
                rows={4}
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.bio && touched.bio)}
                errorMessage={errors.bio as string}
              />
            </div>
          </Form>
        </CommonModal>
      )}
    </Formik>
  );
}
