import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Sidebar from "../components/Sidebar";
import AddStudent from "../components/AddStudent";
import StudentLists from "../components/StudentLists";
import { StudentService, type Student } from "../services/StudentService";
import { GraduationCap } from "lucide-react";

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStudents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await StudentService.getAll(controller.signal);
        setStudents(data);
      } catch (err) {
        if (err instanceof AxiosError && err.code === "ERR_CANCELED") return;
        setError(typeof err === "string" ? err : "Failed to load students.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchStudents();

    return () => controller.abort();
  }, []);

  const handleFormSubmit = async (data: Student) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (editingStudent) {
        const updated = await StudentService.update(
          editingStudent.student_id.toString(),
          data
        );
        setStudents((prev) =>
          prev.map((s) =>
            s.student_id === editingStudent.student_id ? updated : s
          )
        );
      } else {
        const created = await StudentService.create(data);
        setStudents((prev) => [...prev, created]);
      }

      setEditingStudent(null);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : editingStudent
          ? "Failed to update student."
          : "Failed to add student."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = async (studentIdToDelete: string) => {
    const previous = students;
    setStudents((prev) =>
      prev.filter((s) => s.student_id.toString() !== studentIdToDelete)
    );
    setError(null);

    try {
      await StudentService.remove(studentIdToDelete);
    } catch (err) {
      setStudents(previous);
      setError(typeof err === "string" ? err : "Failed to delete student.");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap size={22} className="text-[#255D81]" />
            <h1 className="text-xl font-semibold text-slate-800">
              Add Students
            </h1>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <AddStudent
          editingStudent={editingStudent}
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelEdit}
        />

        <StudentLists
          students={students}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}