import { AxiosError } from "axios";
import { apiClient } from "./auth.service";

export interface Transaction {
  transaction_id: number;
  student: number;
  user: string;
  book: number;
  transaction_type: "borrow" | "return";
  date: string;
  student_name?: string;
  librarian_name?: string;
  book_name?: string;
}

const BASE_PATH = "/api/transactions/";

function extractErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.detail ||
      error.response?.data?.message ||
      fallback
    );
  }
  return fallback;
}

export const TransactionService = {
  async getAll(signal?: AbortSignal): Promise<Transaction[]> {
    try {
      const response = await apiClient.get<Transaction[]>(BASE_PATH, { signal });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.code === "ERR_CANCELED") {
        throw error;
      }
      throw extractErrorMessage(error, "Failed to load transactions.");
    }
  },

  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    try {
      const response = await apiClient.post<Transaction>(BASE_PATH, transaction);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, "Failed to issue book.");
    }
  },
};