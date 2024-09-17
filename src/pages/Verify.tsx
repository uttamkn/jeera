import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Mail } from "lucide-react";
import { AxiosError } from "axios";
import { getTokenAfterSignUp, verifyEmail } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyEmail(parseInt(otp));
      console.log("Email verified");

      const data = localStorage.getItem("sign-up-data");
      if (!data) {
        throw new Error("sign up data was not found in the local storage");
      }

      const parsedData = JSON.parse(data);
      const token = await getTokenAfterSignUp(parsedData);
      setToken(token);
      navigate("/");
    } catch (error: AxiosError | any) {
      setError("Failed to verify the email");
    } finally {
      localStorage.removeItem("sign-up-data");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <Mail size={50} />
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center ">
              <label htmlFor="otp" className="block text-sm font-medium">
                Enter the OTP sent to your email:
              </label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
