import { FC, useState, ChangeEvent } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { createProject } from "@/api/project";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/DateRangePicker";
import InviteStudentModal from "../components/InviteStudentModal";
import InviteGuideModal from "../components/InviteGuideModal";

const CreateProjectForm: FC = () => {
  const navigate = useNavigate();

  interface FormData {
    name: string;
    topic: string;
    description: string;
    projectType: "In-house" | "Company";
    companyName: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    topic: "",
    description: "",
    projectType: "In-house", // Default to "In-house"
    companyName: "", // Empty by default, only used if project type is "Company"
  });
  const [error, setError] = useState("");
  const [isInviteStudentOpen, setIsInviteStudentOpen] = useState(false);
  const [isInviteGuideOpen, setIsInviteGuideOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleInviteStudent = (usn: string, email: string) => {
    console.log(`Inviting student with USN: ${usn}, Email: ${email}`);
  };

  const handleInviteGuide = (email: string) => {
    console.log(`Inviting guide with Email: ${email}`);
  };
  const handleProjectTypeChange = (value: "In-house" | "Company") => {
    setFormData((prev) => ({
      ...prev,
      projectType: value,
      companyName: value === "Company" ? "" : "", // Reset company name if switching to "In-house"
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.projectType === "Company" && !formData.companyName) {
      setError("Company name is required for company projects.");
      return;
    }
    try {
      await createProject({
        _id: "",
        name: formData.name,
        description: formData.description,
        topic: formData.topic,
        projectType: formData.projectType,
        companyName:
          formData.projectType === "Company" ? formData.companyName : undefined,
        startDate: dateRange?.from || new Date(), // Use the selected start date or default to current date
        endDate: dateRange?.to || new Date(), // Use the selected end date or default to current date
        guides: [],
        students: [],
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xl space-y-6 rounded-md border border-gray-300 bg-white p-6 text-black shadow-md">
      <h1 className="text-3xl font-bold text-stone-900">Create New Project</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Input
            id="title"
            name="name"
            label="Project Title"
            placeholder="Enter project title"
            value={formData.name}
            onChange={handleChange}
            className="text-black"
            required
          />
        </div>

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

        <div className="space-y-1">
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-gray-700"
          >
            Project Type
          </label>
          <Select
            value={formData.projectType}
            onValueChange={(value: string) =>
              handleProjectTypeChange(value as "In-house" | "Company")
            }
          >
            <SelectTrigger className="focus:ring-primary focus:border-primary w-1/4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none">
              <SelectValue>
                {formData.projectType || "Select project type"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In-house">In-House</SelectItem>
              <SelectItem value="Company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.projectType === "Company" && (
          <div>
            <Input
              id="companyName"
              name="companyName"
              label="Company Name"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              className="text-black"
              required
            />
          </div>
        )}

        {error && <div className="text-sm text-red-500">{error}</div>}
        <div className="mt-4">
          <label className="block text-sm font-medium">
            Project Date Range
          </label>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            className="mt-2 w-full"
          />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsInviteStudentOpen(true)}
            >
              Invite Students
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsInviteGuideOpen(true)}
            >
              Invite Guides
            </Button>
          </div>

          <Button type="submit" className="ml-auto">
            Create Project
          </Button>
        </div>
      </form>

      {/* Invite Student Modal */}
      <InviteStudentModal
        isOpen={isInviteStudentOpen}
        onClose={() => setIsInviteStudentOpen(false)}
        onInvite={handleInviteStudent}
      />

      {/* Invite Guide Modal */}
      <InviteGuideModal
        isOpen={isInviteGuideOpen}
        onClose={() => setIsInviteGuideOpen(false)}
        onInvite={handleInviteGuide}
      />
    </div>
  );
};

export default CreateProjectForm;
