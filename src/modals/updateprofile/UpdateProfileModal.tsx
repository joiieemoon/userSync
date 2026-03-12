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
import { Formik, Form, } from "formik";;
import avatar from "../../../public/avtar.png";
import useTitle from "../../hooks/useTitle/useTitle";
import EditBtn from "../../components/button/editbutton/Editbtn.tsx";
import Inputfields from "../../components/formfields/Formfields.tsx";
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
  useTitle("User Sync-Update Profile");
  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "",
    bio: user.bio || "",
    profilePhoto: user.profilePhoto || "",
  };

  //  Convert image → base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!user.uid) return;
    console.log("Submitting...", values);
    try {
      let photoURL = values.profilePhoto;

      //  If new image selected → convert to base64
      if (selectedFile) {
        photoURL = await convertToBase64(selectedFile);
      }

      const updatedData = {
        ...values,
        profilePhoto: photoURL,
      };

      // Firestore update
      await updateDoc(doc(db, "Users", user.uid), updatedData);

      // Redux update
      dispatch(updateUser(updatedData));

      toast.success("Profile updated successfully!", {
        position: "top-center",
      });

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile", { position: "top-center" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60  flex items-center justify-center z-50 p-4">
      <div className="bg-white  rounded-3xl shadow-2xl w-full max-w-3xl p-8 md:p-10 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 ">
          Update Profile
        </h2>

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
            isSubmitting,
            setFieldValue,
          }) => (
            <Form className="space-y-6">
        
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <img
                  src={preview || values.profilePhoto || avatar}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-gray-300"
                />
                <FileInput
                  type="file"
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.profilePhoto}
                  </p>
                )}
              </div>

             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {["firstName", "lastName", "email", "phone"].map((field) => (
                  <Inputfields
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={`Enter your ${field}`}
                    value={values[field as keyof typeof values]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!(
                        errors[field as keyof typeof errors] &&
                        touched[field as keyof typeof touched]
                      )
                    }
                    errorMessage={
                      errors[field as keyof typeof errors] as string
                    }
                  />
                ))}

                <Inputfields
                  label="Bio"
                  name="bio"
                  as="textarea"
                  rows={4}
                  placeholder="Tell us about yourself"
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.bio && touched.bio)}
                  errorMessage={errors.bio as string}
                />
              </div>

          
              <div className="flex justify-end gap-4">
                <EditBtn
                  type="button"
                  onClick={onClose}
                  label="Cancel"
                  icon=""
                  variant="secondary"
                />

                <EditBtn
                  icon=""
                  type="submit"
                  label={isSubmitting ? "Saving..." : "Save Changes"}
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
