import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoutes from "./ProtectedRoute";
import SignIn from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import Verify from "@/pages/VerifyPage";
import Dashboard from "@/pages/Dashboard";
import CreateProject from "@/pages/CreateProjectPage";
import ProjectDetails from "../pages/ProjectPage";
import HeroPage from "@/pages/HeroPage";

const Routes = () => {
  const { token } = useAuth();

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
      path: "/",
      element: <HeroPage />,
      children: [
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
      ],
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
