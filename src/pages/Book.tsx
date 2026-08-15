import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Sidebar from "../components/Sidebar";
import AddBook from "../components/AddBook";
import BookDetail from "../components/BookDetail";
import { BookService, type Book } from "../services/BookService";
import { BookOpen } from "lucide-react";

export default function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await BookService.getAll(controller.signal);
        setBooks(data);
        
      } catch (err) {
        if (err instanceof AxiosError && err.code === "ERR_CANCELED") return;
        setError(typeof err === "string" ? err : "Failed to load books.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchBooks();

    return () => controller.abort();
  }, []);

  const handleFormSubmit = async (data: Book) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (editingBook) {
        const updated = await BookService.update(editingBook.BookID.toString(), data);
        setBooks((prev) =>
          prev.map((b) => (b.BookID === editingBook.BookID ? updated : b))
        );
      } else {
        const created = await BookService.create(data);
        setBooks((prev) => [...prev, created]);
      }

      setEditingBook(null);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : editingBook
          ? "Failed to update book."
          : "Failed to add book."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  const handleDelete = async (bookIdToDelete: string) => {
    const previous = books;
    setBooks((prev) => prev.filter((b) => b.BookID.toString() !== bookIdToDelete));
    setError(null);

    try {
      await BookService.remove(bookIdToDelete);
    } catch (err) {
      setBooks(previous);
      setError(typeof err === "string" ? err : "Failed to delete book.");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen size={22} className="text-[#255D81]" />
            <h1 className="text-xl font-semibold text-slate-800">
              Books Details
            </h1>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <AddBook
          editingBook={editingBook}
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelEdit}
        />

        <BookDetail
          books={books}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}