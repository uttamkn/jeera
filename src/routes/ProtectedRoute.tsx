import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const isTokenValid = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get("/api/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};

const ProtectedRoutes = () => {
  const { token, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        const valid = await isTokenValid(token);
        setIsValid(valid);
      } else {
        setIsValid(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    console.error("Token is invalid");
    setToken(null);
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
