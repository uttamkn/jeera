import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { useState } from "react";

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const switchToSignIn = () => {
    setIsSignIn(true);
  };

  const switchToSignUp = () => {
    setIsSignIn(false);
  };

  return (
    <div>
      {isSignIn ? (
        <SignIn switchToSignUp={switchToSignUp} />
      ) : (
        <SignUp switchToSignIn={switchToSignIn} />
      )}
    </div>
  );
};

export default Auth;
