import { ChangeEvent, useState } from "react";
import { Input } from "./ui/Input.tsx";
import { Button } from "./ui/Button.tsx";

type SignUpProps = {
  switchToSignIn: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ switchToSignIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

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
    //TODO: handle sign up form submission
    console.log(formData);
  };

  return (
    <div className="w-96 flex flex-col pl-10 pt-10 pr-10 pb-3 justify-center bg-secondary gap-5 rounded-md border border-primary shadow-md text-primary">
      <h1 className="font-heading2 font-bold text-4xl mb-2 text-primary cursor-default">
        {" "}
        Register Now{" "}
      </h1>

      <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="JohnDoe"
          value={formData.username}
          onChange={handleChange}
          required={true}
        ></Input>

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="johndoe@example.com"
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
          label="Confirm Password"
          type="password"
          name="confirm_password"
          placeholder="Must match the password"
          value={formData.confirm_password}
          onChange={handleChange}
          required={true}
        ></Input>

        {error && <div className="text-center text-red-600">*{error}*</div>}
        <div className="w-100 text-center text-sm italic font-light text-primary cursor-default">
          Track, manage, succeed.
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
      <div className="w-full">
        Already have an account?{" "}
        <Button
          variant="link"
          className="pl-0 font-semibold"
          onClick={switchToSignIn}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};
export default SignUp;
