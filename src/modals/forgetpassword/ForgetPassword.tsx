import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../components/firebase/firebase.ts";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import EditBtn from "../../components/button/editbutton/Editbtn.tsx";
import Inputfields from "../../components/formfields/Formfields.tsx";
import CommonModal from "../common-modal/index.tsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
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
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
  

      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange, handleBlur, submitForm }) => (
          <CommonModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={submitForm} 
            submitLabel={isSubmitting ? "Sending..." : "Send Reset Link"}
            cancelLabel="Cancel"
            title={<div className="flex flex-col items-center">
                        <span>Forget Password</span>
                      </div>}
          >
            <Form>
              <Inputfields
                label="Email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form>
          </CommonModal>
        )}
      </Formik>
    </>
  );
}
