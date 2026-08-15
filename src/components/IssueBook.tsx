import { useState } from "react";
import type { Transaction } from "../services/TransactionService";

interface IssueBookProps {
  isSubmitting: boolean;
  onSubmit: (data: Partial<Transaction>) => void;
}

export default function IssueBook({ isSubmitting, onSubmit }: IssueBookProps) {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId || !userId || !date) return;

    const [year, month, day] = date.split("-");

    onSubmit({
      book: parseInt(bookId),
      student: parseInt(userId),
      transaction_type: "borrow",
      date: `${year}/${month}/${day}`,
    });

    setBookId("");
    setUserId("");
    setBookTitle("");
    setIsbn("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#E3E3E3] border border-slate-200 rounded-2xl p-6 mb-8 max-w-3xl"
    >
      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Book ID
          </label>
          <input
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            UserID
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Book Title
          </label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

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
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mb-6 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2.5 rounded-md bg-[#255D81] text-white text-sm font-semibold hover:bg-[#184e63] transition disabled:opacity-60"
      >
        {isSubmitting ? "BORROWING..." : "Borrow"}
      </button>
    </form>
  );
}