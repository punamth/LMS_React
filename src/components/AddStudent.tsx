import { useEffect, useState } from "react";
import type { Student } from "../services/StudentService";

interface AddStudentProps {
  editingStudent: Student | null;
  isSubmitting: boolean;
  onSubmit: (data: Student) => void;
  onCancel: () => void;
}

export default function AddStudent({
  editingStudent,
  isSubmitting,
  onSubmit,
  onCancel,
}: AddStudentProps) {
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setStudentId(editingStudent.student_id.toString());
      setDepartment(editingStudent.department);
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setContactNumber(editingStudent.contact_number);
    } else {
      setStudentId("");
      setDepartment("");
      setName("");
      setEmail("");
      setContactNumber("");
    }
  }, [editingStudent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!department || !name || !email || !contactNumber) return;
    onSubmit({
      ...(editingStudent ? { student_id: parseInt(studentId) } : {}),
      department: department,
      name: name,
      email: email,
      contact_number: contactNumber,
    } as Student);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#E3E3E3] border border-slate-200 rounded-2xl p-6 mb-8 max-w-3xl"
    >
      <div className="grid grid-cols-2 gap-x-6">
        {editingStudent && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              disabled
              className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Department
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-6 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contact No.
          </label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full mb-6 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-md bg-[#255D81] text-white text-sm font-semibold hover:bg-[#184e63] transition disabled:opacity-60"
        >
          {isSubmitting
            ? editingStudent
              ? "SAVING..."
              : "ADDING..."
            : editingStudent
            ? "SAVE CHANGES"
            : "ADD STUDENT"}
        </button>

        {editingStudent && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-md bg-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-400 transition"
          >
            CANCEL
          </button>
        )}
      </div>
    </form>
  );
}