import React from "react";

interface SettingsRowProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ label, htmlFor, children }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
      <label htmlFor={htmlFor} className="text-sm text-gray-700 w-1/3">
        {label}
      </label>
      <div className="w-2/3">{children}</div>
    </div>
  );
};

export default SettingsRow;