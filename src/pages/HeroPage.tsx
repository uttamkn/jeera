import { Outlet } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:visible md:flex md:w-full">
        <h1 className="text-4xl font-bold">Hero Page</h1>
      </div>
      <div className="h-full w-full md:w-2/3">
        {
          //Sign in and sign up components will be rendered here
        }
        <Outlet />
      </div>
    </div>
  );
};

export default HeroPage;
