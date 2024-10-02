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
      className="cursor-pointer rounded-lg border border-gray-300 p-6 shadow-md transition-shadow hover:shadow-lg"
      onClick={handleCardClick}
    >
      <h2 className="mb-6 text-3xl font-bold">{name}</h2> {/* Larger Text */}
      <p className="text-2xl text-gray-600">{topic}</p> {/* Larger Text */}
    </div>
  );
};

export default ProjectCard;
