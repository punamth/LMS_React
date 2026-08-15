import type { Transaction } from "../services/TransactionService";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function TransactionList({
  transactions,
  isLoading,
}: TransactionListProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-800">
              <th className="px-4 py-3 text-left font-medium">T_ID</th>
              <th className="px-4 py-3 text-left font-medium">User ID</th>
              <th className="px-4 py-3 text-left font-medium">S_ID</th>
              <th className="px-4 py-3 text-left font-medium">Book ID</th>
              <th className="px-4 py-3 text-left font-medium">
                Transaction Type
              </th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No transactions available.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.transaction_id} className="border-b border-slate-100">
                  <td className="px-4 py-3">
                    {t.transaction_id.toString().padStart(3, "0")}
                  </td>
                  <td className="px-4 py-3">
                    {t.user.toString().padStart(3, "0")}
                  </td>
                  <td className="px-4 py-3">
                    {t.student.toString().padStart(3, "0")}
                  </td>
                  <td className="px-4 py-3">{t.book}</td>
                  <td className="px-4 py-3 capitalize">
                    {t.transaction_type}
                  </td>
                  <td className="px-4 py-3">{t.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}