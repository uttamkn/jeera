import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectT } from "@/types";
import { getProjectById } from "@/api/project";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        if (!id) {
          throw new Error("Project ID not provided");
        }
        const project = await getProjectById(id);
        setProject(project);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch project details");
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
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
