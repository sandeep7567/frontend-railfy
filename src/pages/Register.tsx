import RegisterForm from "@/components/form/RegisterForm";
import AccountTemplate from "@/components/layout/AccountTemplate";

const Register = () => {
  return (
    <AccountTemplate
      title="Register!"
      description="Enter your credentials to create your new account"
      footText="Already have an account?"
      footLink="/"
      footLinkText="Sign In"
    >
      <RegisterForm />
    </AccountTemplate>
  );
};

export default Register;
