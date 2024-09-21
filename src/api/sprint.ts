import axios, { AxiosError } from "axios";
import { SprintT } from "@/types";
export const addSprint = async (sprintData: SprintT): Promise<void> => {
    try {
      await axios.post("/api/sprint/add-sprint", sprintData);
      console.log("Sprint created successfully");
    } catch (err: AxiosError | any) {
      console.error(err?.response?.data?.error || "An error occurred while adding the sprint");
      throw new Error("Failed to create sprint");
    }
  };
  