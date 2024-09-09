import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button.tsx";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

type SignInProps = {
  switchToSignUp: () => void;
};

const SignIn: React.FC<SignInProps> = ({ switchToSignUp }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("/auth/sign_in", formData);

      // Success - handle successful sign in (e.g., redirect, update state)
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status,
        );
        setError("Invalid email or password");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-96 flex flex-col pl-10 pt-10 pr-10 pb-3 justify-center bg-secondary gap-5 rounded-md border border-primary shadow-md text-primary">
      <h1 className="font-heading2 font-bold text-4xl mb-2 text-primary cursor-default">
        {" "}
        Sign In{" "}
      </h1>

      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required={true}
        ></Input>

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
          required={true}
        ></Input>

        {error && <div className="text-center text-red-600">*{error}*</div>}
        <Button className="mt-4">Sign In</Button>
      </form>
      <div className="w-full">
        Don't have an account?{" "}
        <button className="font-semibold" onClick={switchToSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
