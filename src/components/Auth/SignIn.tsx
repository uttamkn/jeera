import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";
import { getTokenAfterSignIn } from "@/api/auth";

const SignIn: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = await getTokenAfterSignIn(formData);
      setToken(token);
      navigate("/");
    } catch (err: AxiosError | any) {
      setError(err.response.data.error);
    }
  };

  const switchToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="bg-secondary text-primary border-primary mx-auto mt-20 w-full max-w-md space-y-6 rounded-md border p-6 shadow-md">
      <h1 className="text-primary mb-4 text-3xl font-bold">
        Hello,
        <br />
        Welcome Back
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Input
            label="Email"
            value={formData.email}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <Input
            label="Password"
            value={formData.password}
            type="password"
            name="password"
            placeholder="********"
            required
            onChange={handleChange}
          />
        </div>

        {error && <div className="text-center text-red-600">{error}</div>}

        {
          //TODO: Add forgot password functionality
        }
        <div className="text-primary text-center text-sm font-light italic">
          Forgot password?
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>

      <div className="text-center">
        Don't have an account?{" "}
        <Button
          variant="link"
          className="pl-0 font-semibold"
          onClick={switchToSignUp}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
