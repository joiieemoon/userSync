import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/firebase/firebase";
import { updateUser } from "../../redux/store/authSlice";
import type { AppDispatch } from "../../redux/store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfileValidationSchema } from "../../../src/components/validations/validationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-3xl p-8 md:p-10 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Update Profile
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={updateProfileValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <img
                  src={
                    preview ||
                    values.profilePhoto ||
                    "https://i.pravatar.cc/150?img=12"
                  }
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const file = e.target.files[0];
                      setSelectedFile(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="text-sm"
                />
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {["firstName", "lastName", "email", "phone", "role"].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {field}
                      </label>

                      <Field
                        name={field}
                        className="w-full px-4 py-3 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />

                      <ErrorMessage name={field}>
                        {(msg) => (
                          <p className="text-red-500 text-xs mt-1">{msg}</p>
                        )}
                      </ErrorMessage>
                    </div>
                  )
                )}

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>

                  <Field
                    name="bio"
                    as="textarea"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />

                  <ErrorMessage name="bio">
                    {(msg) => (
                      <p className="text-red-500 text-xs mt-1">{msg}</p>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-200 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  // type="submit"
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
