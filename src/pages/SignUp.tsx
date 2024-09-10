import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
