export type UserT = {
  username: string;
  password: string;
  email: string;
  role: "student" | "faculty";
};

export type ProjectT = {
  title: string;
  topic: string;
  description: string;
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
};

