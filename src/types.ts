// src/types.ts

export type UserT = {
  username: string;
  password: string;
  email: string;
  role: "student" | "faculty";
};

export type SprintT = {
  _id: string; // MongoDB ID for the sprint
  name: string; // Name of the sprint
  projectId: string; // Reference to the associated project
  startDate: Date; // Start date of the sprint
  endDate: Date; // End date of the sprint
  status: "to-do" | "in-progress" | "done";
  tasks: string[]; // Task IDs associated with the sprint
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
