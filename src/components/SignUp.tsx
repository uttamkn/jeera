import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button.tsx";
import axios from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

type SignUpProps = {
  switchToSignIn: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ switchToSignIn }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    } else {
      setError("");
    }

    try {
      await axios.put("/auth/sign_up", formData);

      // Success
      setFormData({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });
      switchToSignIn();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status,
        );
        setError("User already exists, try a different username");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-96 flex flex-col pl-10 pt-10 pr-10 pb-3 justify-center bg-secondary gap-5 rounded-md border border-primary shadow-md text-primary">
      <h1 className="font-heading2 font-bold text-4xl mb-2 text-primary cursor-default">
        {" "}
        Register Now{" "}
      </h1>

      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Elon"
          value={formData.username}
          onChange={handleChange}
          required={true}
        ></Input>

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
          placeholder="Must be at least 8 characters long"
          value={formData.password}
          onChange={handleChange}
          required={true}
        ></Input>

        <Input
          label="Conform password"
          type="password"
          name="confirm_password"
          placeholder="Must match the password"
          value={formData.confirm_password}
          onChange={handleChange}
          required={true}
        ></Input>

        {error && <div className="text-center text-red-600">*{error}*</div>}
        <Button className="mt-4">Sign Up</Button>
      </form>
      <div className="w-full">
        Already have an account?{" "}
        <button className="font-semibold" onClick={switchToSignIn}>
          Sign in
        </button>
      </div>
    </div>
  );
};
export default SignUp;
