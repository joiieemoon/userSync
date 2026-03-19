import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase/firebase.ts";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import CommonModal from "../../components/comman-modal/common-modal";
import FormController from "../../components/form-controller/index.tsx";
import type { forgetpasswordprops } from "../../types/interfaces/index.ts";


const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword({
  isOpen,
  onClose,
}: forgetpasswordprops) {
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
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          submitForm,
          errors,
          touched,
        }) => (
          <CommonModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={submitForm}
            submitLabel={isSubmitting ? "Sending..." : "Send Reset Link"}
            cancelLabel="Cancel"
            title={
              <div className="flex flex-col items-center">
                <span>Forget Password</span>
              </div>
            }
          >
            <Form>
              <FormController
                control="input"
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                errorMessage={errors.email}
              />
            </Form>
          </CommonModal>
        )}
      </Formik>
    </>
  );
}
