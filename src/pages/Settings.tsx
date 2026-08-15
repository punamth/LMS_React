import React, { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import SettingsSection from "../components/SettingsSection";
import SettingsRow from "../components/SettingsRow";
import ToggleSwitch from "../components/ToggleSwitch";
import SaveButton from "../components/SaveButton";

interface LibraryInfo {
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
}

interface FineSettings {
  finePerDay: number;
  maxBorrowDays: number;
  maxBooksPerStudent: number;
}

const Settings: React.FC = () => {
  const [libraryInfo, setLibraryInfo] = useState<LibraryInfo>({
    name: "HSMSS Library",
    address: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [fineSettings, setFineSettings] = useState<FineSettings>({
    finePerDay: 5,
    maxBorrowDays: 14,
    maxBooksPerStudent: 3,
  });

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dueDateReminders, setDueDateReminders] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);

  const handleSave = () => {
    console.log({ libraryInfo, fineSettings, emailNotifications, dueDateReminders, autoBackup });
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon size={20} className="text-gray-700" />
        <h1 className="text-xl font-semibold text-gray-800">Setting</h1>
      </div>

      <div className="max-w-3xl">
        <SettingsSection title="Library Information" description="Basic details shown across the system">
          <SettingsRow label="Library Name">
            <input
              type="text"
              value={libraryInfo.name}
              onChange={(e) => setLibraryInfo({ ...libraryInfo, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </SettingsRow>
          <SettingsRow label="Address">
            <input
              type="text"
              value={libraryInfo.address}
              onChange={(e) => setLibraryInfo({ ...libraryInfo, address: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </SettingsRow>
          <SettingsRow label="Contact Email">
            <input
              type="email"
              value={libraryInfo.contactEmail}
              onChange={(e) => setLibraryInfo({ ...libraryInfo, contactEmail: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </SettingsRow>
          <SettingsRow label="Contact Phone">
            <input
              type="tel"
              value={libraryInfo.contactPhone}
              onChange={(e) => setLibraryInfo({ ...libraryInfo, contactPhone: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Borrowing & Fine Rules" description="Controls used by the Transaction and Issuing modules">
          <SettingsRow label="Fine per Day (Rs.)">
            <input
              type="number"
              value={fineSettings.finePerDay}
              onChange={(e) => setFineSettings({ ...fineSettings, finePerDay: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </SettingsRow>
          <SettingsRow label="Max Borrow Days">
            <input
              type="number"
              value={fineSettings.maxBorrowDays}
              onChange={(e) => setFineSettings({ ...fineSettings, maxBorrowDays: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </SettingsRow>
          <SettingsRow label="Max Books per Student">
            <input
              type="number"
              value={fineSettings.maxBooksPerStudent}
              onChange={(e) => setFineSettings({ ...fineSettings, maxBooksPerStudent: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsRow label="Email Notifications">
            <ToggleSwitch checked={emailNotifications} onChange={setEmailNotifications} />
          </SettingsRow>
          <SettingsRow label="Due Date Reminders">
            <ToggleSwitch checked={dueDateReminders} onChange={setDueDateReminders} />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Data & Backup">
          <SettingsRow label="Automatic Daily Backup">
            <ToggleSwitch checked={autoBackup} onChange={setAutoBackup} />
          </SettingsRow>
        </SettingsSection>

        <div className="flex justify-end">
          <SaveButton onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default Settings;