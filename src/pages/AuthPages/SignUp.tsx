import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../../features/auth/AuthPageLayout.tsx";

// import SignUpForm from "../../components/auth/components/singup-form/SignUpForm";
import SignUpForm from "../../features/auth/components/signup-form/index.tsx";
export default function SignUp() {
  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
