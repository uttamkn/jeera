import { FC } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "@/api/project";

const CreateProjectForm: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProject({
        title: formData.title,
        description: formData.description,
        topic: formData.topic,
        guides: [],
        students: [],
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to create project");
      console.error("Error creating project:", err);
    }
  };

  //TODO: Implement inviting functionality
  const handleInviteClick = () => {
    console.log("Invite Students");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white text-black border border-gray-300 rounded-md shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-stone-900">Create New Project</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Input
            id="title"
            name="title"
            label="Project Title"
            placeholder="Enter project title"
            value={formData.title}
            onChange={handleChange}
            className="text-black"
            required
          />
        </div>

        {/*TODO: Change the input type of project topic to a dropdown */}
        <div>
          <Input
            id="topic"
            name="topic"
            label="Project Topic"
            placeholder="Enter project topic"
            value={formData.topic}
            onChange={handleChange}
            className="text-black"
            required
          />
        </div>

        <div>
          <Textarea
            id="description"
            name="description"
            label="Project Description"
            placeholder="Enter project description"
            value={formData.description}
            onChange={handleChange}
            className="text-black"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-between items-center">
          <Button type="button" variant="outline" onClick={handleInviteClick}>
            Invite Students
          </Button>
          <Button type="submit" className="ml-4">
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
