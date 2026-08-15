import { useEffect, useState } from "react";
import type { Book } from "../services/BookService";

interface AddBookProps {
  editingBook: Book | null;
  isSubmitting: boolean;
  onSubmit: (data: Book) => void;
  onCancel: () => void;
}

export default function AddBook({
  editingBook,
  isSubmitting,
  onSubmit,
  onCancel,
}: AddBookProps) {
  const [bookId, setBookId] = useState("");
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (editingBook) {
      setBookId(editingBook.BookID.toString());
      setIsbn(editingBook.ISBN);
      setTitle(editingBook.Title);
      setGenre(editingBook.Genre);
      setAuthorId(editingBook.AuthorID.toString());
      setQuantity(editingBook.Quantity.toString());
    } else {
      setBookId("");
      setIsbn("");
      setTitle("");
      setGenre("");
      setAuthorId("");
      setQuantity("");
    }
  }, [editingBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isbn || !title || !genre || !authorId || !quantity) return;
    onSubmit({
      ...(editingBook ? { BookID: parseInt(bookId) } : {}),
      ISBN: isbn,
      Title: title,
      Genre: genre,
      AuthorID: parseInt(authorId),
      Quantity: parseInt(quantity),
    } as Book);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#E3E3E3] border border-slate-200 rounded-2xl p-6 mb-8 max-w-3xl"
    >
      <div className="grid grid-cols-2 gap-x-6">
        {editingBook && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Book ID
            </label>
            <input
              type="text"
              value={bookId}
              disabled
              className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ISBN
          </label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Genre
          </label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            AuthorID
          </label>
          <input
            type="text"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Quantity
          </label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
            ? editingBook
              ? "SAVING..."
              : "ADDING..."
            : editingBook
            ? "SAVE CHANGES"
            : "ADD BOOK"}
        </button>

        {editingBook && (
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