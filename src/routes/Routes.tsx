import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoutes from "./ProtectedRoute";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Verify from "@/pages/Verify";
import Dashboard from "@/pages/Dashboard";
import CreateProject from "@/components/CreateProject";
import ProjectDetails from "../components/ProjectDetails";

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
        {
          path: "project/:id",
          element: <ProjectDetails />,
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
