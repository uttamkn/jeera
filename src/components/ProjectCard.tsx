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
      className="border border-gray-300 rounded-lg p-6 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <h2 className="text-3xl font-bold mb-6">{name}</h2> {/* Larger Text */}
      <p className="text-2xl text-gray-600">{topic}</p> {/* Larger Text */}
    </div>
  );
};

export default ProjectCard;
