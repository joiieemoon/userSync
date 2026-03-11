import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../components/firebase/firebase.ts";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import EditBtn from "../../components/button/editbutton/Editbtn.tsx";
import Inputfields from "../../components/formfields/Formfields.tsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
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
          {({ isSubmitting, values, handleChange, handleBlur }) => (
            <Form>
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-400! text-sm mb-2 "
              />

              <Inputfields
              label="Email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <div className="flex justify-evenly items-center mt-7">
                <EditBtn
                  type="submit"
                  disabled={isSubmitting}
                  icon=""
                  label={isSubmitting ? "Sending..." : "Send Reset Link"}
                />

                <EditBtn
                  onClick={onClose}
                  type="button"
                  label="cancel"
                  icon=""
                  variant="secondary"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
