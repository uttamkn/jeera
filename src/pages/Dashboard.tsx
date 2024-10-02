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
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4">
      <div className="mb-8 rounded-lg bg-black p-6 text-white shadow-md">
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
      </div>

      <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full lg:w-2/3">
          {/* Flex container for heading and button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex-grow rounded-lg border border-gray-700 bg-gray-900 p-2 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-100">
                My Projects
              </h2>
            </div>
            <Button
              onClick={handleCreateProject}
              className="py- ml-4 rounded-md bg-gray-800 px-4 text-white shadow-lg transition duration-150 ease-in-out hover:bg-gray-700 hover:shadow-xl"
            >
              Create Project
            </Button>
          </div>

          {/* Project cards */}
          {projects.length === 0 ? (
            <div className="text-center text-gray-400">
              No projects available. Create a new project to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
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
        <div className="w-full lg:w-1/3">
          <AssignedToMe />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
