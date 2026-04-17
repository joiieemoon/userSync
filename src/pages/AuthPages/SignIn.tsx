import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../../features/auth/AuthPageLayout.tsx";

// import ../../features/auth/components/signin-form from "../../features/auth/components/signup-form";
// import SignInForm from "../../features/auth/components/signup-form/index.tsx";
import SignInForm from "../../features/auth/components/login-form/index.tsx";
export default function SignIn() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
