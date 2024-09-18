import  { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; 
import axios from "axios";

interface Project {
  _id: string;
  name: string;
  topic: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/project/get-all-projects");
        setProjects(response.data.projects);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleCreateProject}>Create Project</Button>
      </div>

      {projects.length === 0 ? (
        <div>No projects available. Create a new project to get started!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              name={project.name}
              topic={project.topic}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
