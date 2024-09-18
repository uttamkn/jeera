export type UserT = {
  username: string;
  password: string;
  email: string;
  role: "student" | "faculty";
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
};
