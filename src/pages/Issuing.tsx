import { useState } from "react";
import Sidebar from "../components/Sidebar";
import IssueBook from "../components/IssueBook";
import { TransactionService, type Transaction } from "../services/TransactionService";
import { TokenService } from "../services/token.service";
import { BookMarked } from "lucide-react";

function getLoggedInUserId(): string | null {
  const token = TokenService.getAccessToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId ?? null;
  } catch {
    return null;
  }
}

export default function IssuingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleIssue = async (data: Partial<Transaction>) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const userId = getLoggedInUserId();
    if (!userId) {
      setError("Could not identify logged-in librarian. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    try {
      await TransactionService.create({ ...data, user: userId });
      setSuccess("Book issued successfully.");
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to issue book.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookMarked size={22} className="text-[#255D81]" />
            <h1 className="text-xl font-semibold text-slate-800">
              Issue Book
            </h1>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="max-w-2xl mb-4 px-4 py-3 rounded-md bg-green-50 border border-green-200 text-sm text-green-700">
            {success}
          </div>
        )}

        <IssueBook isSubmitting={isSubmitting} onSubmit={handleIssue} />
      </div>
    </div>
  );
}