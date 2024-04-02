import LoginForm from "@/components/form/LoginForm";
import AccountTemplate from "@/components/layout/AccountTemplate";

const Login = () => {
  return (
    <AccountTemplate
      title="Login"
      description="Enter your credentials to access your account"
      footText="New user?"
      footLink="/register"
      footLinkText="Sign up"
    >
      <LoginForm />
    </AccountTemplate>
  );
};

export default Login;
