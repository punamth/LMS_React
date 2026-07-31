import { useEffect, useState } from "react";
import type { Author } from "../services/AuthorService";

interface AddAuthorProps {
  editingAuthor: Author | null;
  isSubmitting: boolean;
  onSubmit: (data: Author) => void;
  onCancel: () => void;
}

export default function AddAuthor({
  editingAuthor,
  isSubmitting,
  onSubmit,
  onCancel,
}: AddAuthorProps) {
  const [authorId, setAuthorId] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (editingAuthor) {
      setAuthorId(editingAuthor.AuthorID.toString());
      setName(editingAuthor.Name);
      setBio(editingAuthor.Bio);
    } else {
      setAuthorId("");
      setName("");
      setBio("");
    }
  }, [editingAuthor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorId || !name || !bio) return;
    onSubmit({ AuthorID: parseInt(authorId), Name: name, Bio: bio });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#E3E3E3] border border-slate-200 rounded-2xl p-6 mb-8 max-w-2xl"
    >
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Author ID
      </label>

      <input
        type="text"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        disabled={!!editingAuthor}
        className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60"
      />

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Author Name
      </label>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      />

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Bio
      </label>

      <input
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full mb-6 px-4 py-2.5 rounded-md bg-[#D9D9D9] border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-md bg-[#255D81] text-white text-sm font-semibold hover:bg-[#184e63] transition disabled:opacity-60"
        >
          {isSubmitting
            ? editingAuthor
              ? "SAVING..."
              : "ADDING..."
            : editingAuthor
            ? "SAVE CHANGES"
            : "ADD AUTHOR"}
        </button>

        {editingAuthor && (
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