import type { Author } from "../services/AuthorService";

interface AuthorDetailProps {
  authors: Author[];
  isLoading: boolean;
  onEdit: (author: Author) => void;
  onDelete: (authorId: string) => void;
}

export default function AuthorDetail({
  authors,
  isLoading,
  onEdit,
  onDelete,
}: AuthorDetailProps) {
  return (
    <div className="max-w-5xl bg-[#E3E3E3] rounded-2xl border border-[#E3E3E3] shadow-sm p-4">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Author Details
      </h2>

      <div className="overflow-hidden border border-[#E3E3E3] bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#6A6A6A] text-white">
              <th className="px-4 py-4 text-left">Author ID</th>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">Bio</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-slate-500 bg-white"
                >
                  Loading authors...
                </td>
              </tr>
            ) : authors.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-slate-500 bg-white"
                >
                  No authors available.
                </td>
              </tr>
            ) : (
              authors.map((author) => (
                <tr key={author.AuthorID}>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {author.AuthorID}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {author.Name}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    {author.Bio}
                  </td>
                  <td className="px-4 py-3 border border-[#E3E3E3]">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(author)}
                        className="px-4 py-1.5 rounded-xl bg-[#B7A522] text-white text-xs font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(author.AuthorID.toString())}
                        className="px-4 py-1.5 rounded-xl bg-[#D13A3D] text-white text-xs font-semibold"
                      >
                        Delete
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