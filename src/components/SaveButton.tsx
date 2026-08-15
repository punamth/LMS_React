import React from "react";

interface SaveButtonProps {
  onClick: () => void;
  label?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, label = "Save Changes" }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors"
    >
      {label}
    </button>
  );
};

export default SaveButton;