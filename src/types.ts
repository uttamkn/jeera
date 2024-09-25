// src/types.ts

export type UserT = {
  username: string;
  password: string;
  email: string;
  role: "student" | "faculty";
};

export type SprintT = {
  _id: string; 
  name: string; 
  projectId: string; 
  startDate: Date; 
  endDate: Date;
  status: "to-do" | "in-progress" | "done";
  tasks: string[];
};

export type ProjectT = {
  _id: string;
  name: string;
  description: string;
  topic: string;
  projectType: "In-house" | "Company"; // Project type: either In-house or Company
  companyName?: string; // Optional field for company name if the project is company-based
  startDate: Date; 
  endDate: Date;
  guides?: {
    guideEmail: string;
    permissions: {
      canAddSubtasks: boolean;
    };
  }[];
  students?: {
    studentEmail: string;
    permissions: {
      canViewSubtasks: boolean;
    };
  }[];
  sprints?: SprintT[]; // Sprints associated with the project
};
