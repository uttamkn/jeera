import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import AssignedToMe from "../components/AssignedToMe";
import { getAllProjects } from "@/api/project";
import { ProjectT } from "@/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects: ProjectT[] = await getAllProjects();
        setProjects(projects);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-black text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
        
        <div className="lg:w-2/3 w-full">
          {/* Flex container for heading and button */}
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gray-900 border border-gray-700 p-2 rounded-lg shadow-md flex-grow">
              <h2 className="text-2xl font-semibold text-gray-100">My Projects</h2>
            </div>
            <Button 
              onClick={handleCreateProject} 
              className="ml-4 bg-gray-800 text-white px-4 py-6 rounded-md shadow-lg transition duration-150 ease-in-out hover:bg-gray-700 hover:shadow-xl"
            >
              Create Project
            </Button>


          </div>

          {/* Project cards */}
          {projects.length === 0 ? (
            <div className="text-center text-gray-400">No projects available. Create a new project to get started!</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
        
        {/* Right Column: Assigned to Me */}
        <div className="lg:w-1/3 w-full">
          <AssignedToMe />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
