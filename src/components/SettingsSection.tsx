import React from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default SettingsSection;