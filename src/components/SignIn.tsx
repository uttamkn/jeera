type SignUpProps = {
  switchToSignUp: () => void;
};

const SignIn: React.FC<SignUpProps> = ({ switchToSignUp }) => {
  return (
    <>
      <h1 onClick={switchToSignUp}>Sign In</h1>
    </>
  );
};
export default SignIn;
