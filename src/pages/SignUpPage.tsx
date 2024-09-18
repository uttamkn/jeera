import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { UserT } from "@/types";
import { sendEmail } from "@/api/auth";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

type SignUpFormT = UserT & { confirm_password: string };

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormT>({
    username: "",
    password: "",
    email: "",
    role: "student",
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

    // Form validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    } else {
      setError("");
    }

    const { confirm_password, ...data } = formData;

    try {
      await sendEmail(data.email);

      localStorage.setItem("sign-up-data", JSON.stringify(data));
      navigate("/sign-up/verify");
    } catch (err: AxiosError | any) {
      setError(err.response.data.error);
    }
  };

  const switchToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-secondary text-primary border border-primary rounded-md shadow-md space-y-6">
      <h1 className="text-3xl font-bold">Register Now</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="John Doe"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="flex gap-5">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Must be at least 8 characters"
            pattern=".{8,}"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirm_password"
            placeholder="Must match the password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Select
            value={formData.role}
            onValueChange={(value: "faculty" | "student") =>
              setFormData((prev) => ({ ...prev, role: value }))
            }
            required
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="faculty">Faculty</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && <div className="text-center text-red-600">{error}</div>}

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>

      <div className="text-center">
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
