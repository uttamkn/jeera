import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleCreateProject = () => {
    navigate("/create-project");
  };

  return <Button onClick={handleCreateProject}>Create Project</Button>;
};

export default Dashboard;
