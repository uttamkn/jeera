import axios, { AxiosError } from "axios";
import { ProjectT } from "@/types";

export const createProject = async (projectData: ProjectT): Promise<void> => {
  try {
    await axios.post("/api/project/add-project", projectData);
    console.log("Project created successfully");
  } catch (err) {
    throw new Error("Failed to create project");
  }
};

export const getAllProjects = async (): Promise<ProjectT[]> => {
  try {
    const response = await axios.get("/api/project/get-all-projects");
    return response.data.createdProjects;
  } catch (err: AxiosError | any) {
    console.error(err?.data?.error);
    throw new Error("Failed to fetch projects: ");
  }
};

export const getProjectById = async (id: string): Promise<ProjectT> => {
  try {
    const response = await axios.get(`/api/project/get-project/${id}`);
    return response.data.project;
  } catch (err) {
    throw new Error("Failed to fetch project details");
  }
};
