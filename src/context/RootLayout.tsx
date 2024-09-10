import { Link, Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider, SignedOut } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <SignedOut>
        <div className="flex justify-center items-center">
          <Link to="/sign-in">Sign In(click me)</Link>
        </div>
      </SignedOut>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
