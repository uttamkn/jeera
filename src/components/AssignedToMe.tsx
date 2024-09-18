import React from "react";

const AssignedToMe: React.FC = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-md">
      <h2 className="text-lg font-bold mb-2">Assigned to Me</h2>
      <p>You currently have no issues assigned to you. Enjoy your day!</p>
    </div>
  );
};

export default AssignedToMe;
