import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../components/firebase/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const handleSubmit = async (
    values: { email: string },
    { resetForm }: any,
  ) => {
    try {
      await sendPasswordResetEmail(auth, values.email.trim());

      toast.success("Password reset email sent!", {
        position: "top-center",
      });

      resetForm();
      onClose();
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400! text-sm mb-2 "
                />
              <Field
                type="text"
                name="email"
                placeholder="Enter registered email"
                className="w-full  p-2 rounded mb-2"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-300 text-black py-2 rounded mb-2 cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full text-gray-500 cursor-pointer"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
