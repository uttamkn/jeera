import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoutes from "./ProtectedRoute";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import Verify from "@/pages/Verify";
import Dashboard from "@/pages/Dashboard";
import CreateProject from "@/components/CreateProject";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "create-project",
          element: <CreateProject />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/sign-up/verify",
      element: <Verify />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
