import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectT } from "@/types";
import { getProjectById } from "@/api/project";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader, AlertCircle, PlusIcon } from "lucide-react";
import AddSprintModal from "@/components/AddSprintModal";

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

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );

  if (error)
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        <AlertCircle className="mr-2 h-6 w-6" /> {error}
      </div>
    );

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      {project && (
        <>
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">
                {project.name}
              </CardTitle>
              <CardDescription className="mt-2 text-xl">
                {project.topic}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p className="mt-4">{project.description}</p>
            </CardContent>
          </Card>

          <Button
            className="mt-6 flex items-center space-x-2"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Add Sprint</span>
            <span>
              <PlusIcon className="h-4 w-4" />
            </span>
          </Button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Sprint to {project.name}</DialogTitle>
              </DialogHeader>
              <AddSprintModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectId={id || ""}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
