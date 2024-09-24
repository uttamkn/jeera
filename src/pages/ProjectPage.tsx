import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectT } from "@/types";
import { getProjectById } from "@/api/project";
//import AddSprintModal from "./AddSprintModal"; // Import the new component
import AddSprintModal from "@/components/AddSprintModal"; // Import the new component

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch project details on mount
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        if (!id) throw new Error("Project ID not provided");
        const projectData = await getProjectById(id);
        setProject(projectData);
      } catch (err) {
        setError("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {project && (
        <>
          <h1 className="text-4xl font-bold">{project.name}</h1>
          <p className="text-xl mt-4">{project.topic}</p>
          <p className="text-gray-700 mt-4">{project.description}</p>

          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add Sprint
          </button>

\          <AddSprintModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            projectId={id || ""}
          />
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
