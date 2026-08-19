import { Pencil, Trash2 } from "lucide-react";
import type { Student } from "../services/StudentService";

interface StudentListsProps {
  students: Student[];
  isLoading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

export default function StudentLists({
  students,
  isLoading,
  onEdit,
  onDelete,
}: StudentListsProps) {
  return (
    <div className="max-w-5xl bg-[#E3E3E3] rounded-2xl border border-[#E3E3E3] shadow-sm p-4">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Student Lists
      </h2>

      <div className="overflow-hidden border border-[#E3E3E3] bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#6A6A6A] text-white">
              <th className="px-4 py-4 text-left">StudentID</th>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">Department</th>
              <th className="px-4 py-4 text-left">Email</th>
              <th className="px-4 py-4 text-left">Contact No.</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-slate-500 bg-white"
                >
                  Loading students...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-slate-500 bg-white"
                >
                  No students available.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.student_id}>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {student.student_id}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {student.name}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {student.department}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {student.contact_number}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(student)}
                        className="text-[#255D81] hover:text-[#184e63]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(student.student_id.toString())}
                        className="text-[#255D81] hover:text-[#184e63]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}