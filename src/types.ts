export type UserT = {
  username: string;
  password: string;
  email: string;
  role: string;
};
export type ProjectT = {
  title: string;
  topic: string;
  description: string;
  createdBy: string;
  guides?: {
    guideId: string;
    permissions: {
      canAddSubtasks: boolean;
    };
  }[];
  students?: {
    studentId: string;
    permissions: {
      canViewSubtasks: boolean;
    };
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};