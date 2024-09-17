import axios from "axios";
import { ProjectT } from "@/types";

export const createProject = async (projectData: ProjectT): Promise<void> => {
  try {
    await axios.post("/api/project/add-project", projectData);
    console.log("Project created successfully");
  } catch (err) {
    throw new Error("Failed to create project");
  }
};
