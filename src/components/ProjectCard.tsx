import React from "react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  name: string;
  topic: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, topic }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <div
      className="border rounded-md p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-gray-600">{topic}</p>
    </div>
  );
};

export default ProjectCard;
