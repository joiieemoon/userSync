import React from "react";
import { db } from "../../components/firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateProfileValidationSchema } from "../../components/validations/validationSchema";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
};

const EditUser: React.FC<Props> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    role: user.role || "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      await updateDoc(doc(db, "Users", user.uid), values);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Edit User {user.firstName}
        </h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={updateProfileValidationSchema} 
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full border-none bg-gray-300 p-2 rounded "
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full border-none bg-gray-300 p-2 rounded"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full border-none bg-gray-300 p-2 rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field as="select" name="role" className="w-full bg-gray-300 border-none p-2 rounded">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-amber-300 text-black rounded disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUser;
