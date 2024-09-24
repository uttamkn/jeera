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
