import { Pencil, Trash2 } from "lucide-react";
import type { Book } from "../services/BookService";

interface BookDetailProps {
  books: Book[];
  isLoading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

export default function BookDetail({
  books,
  isLoading,
  onEdit,
  onDelete,
}: BookDetailProps) {
  return (
    <div className="max-w-5xl bg-[#E3E3E3] rounded-2xl border border-[#E3E3E3] shadow-sm p-4">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Book Lists
      </h2>

      <div className="overflow-hidden border border-[#E3E3E3] bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#6A6A6A] text-white">
              <th className="px-4 py-4 text-left">BookID</th>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">AuthorID</th>
              <th className="px-4 py-4 text-left">Genre</th>
              <th className="px-4 py-4 text-left">ISBN</th>
              <th className="px-4 py-4 text-left">Quantity</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-slate-500 bg-white"
                >
                  Loading books...
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-slate-500 bg-white"
                >
                  No books available.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.BookID}>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {book.BookID}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {book.Title}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {book.AuthorID}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {book.Genre}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {book.ISBN}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {book.Quantity}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(book)}
                        className="text-[#255D81] hover:text-[#184e63]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(book.BookID.toString())}
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