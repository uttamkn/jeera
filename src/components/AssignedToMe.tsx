import React from "react";

const AssignedToMe: React.FC = () => {
  return (
    <div className="mb-6 rounded-lg border border-gray-300 p-4 shadow-md">
      <h2 className="mb-2 text-lg font-bold">Assigned to Me</h2>
      <p>You currently have no issues assigned to you. Enjoy your day!</p>
    </div>
  );
};

export default AssignedToMe;
