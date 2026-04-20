import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../../features/auth/AuthPageLayout.tsx";


import SignUpForm from "../../features/auth/components/signup-form/index.tsx";
export default function SignUp() {
  return (
    <>
      <PageMeta
        title="UserDesk SignUp Dashboard "
        description="This is  SignUp page for create User account"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
