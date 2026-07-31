import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Sidebar from "../components/Sidebar";
import AddAuthor from "../components/AddAuthor";
import AuthorDetail from "../components/AuthorDetail";
import { AuthorService, type Author } from "../services/AuthorService";
import { User } from "lucide-react";

export default function AuthorPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAuthors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await AuthorService.getAll(controller.signal);
        setAuthors(data);
      } catch (err) {
        if (err instanceof AxiosError && err.code === "ERR_CANCELED") return;
        setError(typeof err === "string" ? err : "Failed to load authors.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchAuthors();

    return () => controller.abort();
  }, []);

  const handleFormSubmit = async (data: Author) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (editingAuthor) {
        const updated = await AuthorService.update(editingAuthor.AuthorID.toString(), data);
        setAuthors((prev) =>
          prev.map((a) => (a.AuthorID === editingAuthor.AuthorID ? updated : a))
        );
      } else {
        const created = await AuthorService.create(data);
        setAuthors((prev) => [...prev, created]);
      }

      setEditingAuthor(null);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : editingAuthor
          ? "Failed to update author."
          : "Failed to add author."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (author: Author) => {
    setEditingAuthor(author);
  };

  const handleCancelEdit = () => {
    setEditingAuthor(null);
  };

  const handleDelete = async (authorIdToDelete: string) => {
    const previous = authors;
    setAuthors((prev) => prev.filter((a) => a.AuthorID.toString() !== authorIdToDelete));
    setError(null);

    try {
      await AuthorService.remove(authorIdToDelete);
    } catch (err) {
      setAuthors(previous);
      setError(typeof err === "string" ? err : "Failed to delete author.");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
           <User size={22} className="text-[#255D81]" />
            <h1 className="text-xl font-semibold text-slate-800">
              Author Info
            </h1>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <AddAuthor
          editingAuthor={editingAuthor}
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelEdit}
        />

        <AuthorDetail
          authors={authors}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}