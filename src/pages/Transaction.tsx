import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Sidebar from "../components/Sidebar";
import TransactionList from "../components/TransactionList";
import { TransactionService, type Transaction } from "../services/TransactionService";
import { Receipt } from "lucide-react";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await TransactionService.getAll(controller.signal);
        setTransactions(data);
      } catch (err) {
        if (err instanceof AxiosError && err.code === "ERR_CANCELED") return;
        setError(typeof err === "string" ? err : "Failed to load transactions.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchTransactions();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Receipt size={22} className="text-[#255D81]" />
            <h1 className="text-xl font-semibold text-slate-800">
              Transaction
            </h1>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <TransactionList transactions={transactions} isLoading={isLoading} />
      </div>
    </div>
  );
}