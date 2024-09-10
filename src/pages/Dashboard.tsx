import { UserButton } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/clerk-react";

const Dashboard: React.FC = () => {
  return (
    <>
      <SignedIn>
        <h1>Dashboard</h1>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default Dashboard;
