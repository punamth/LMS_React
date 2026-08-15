import { AxiosError } from "axios";
import { apiClient } from "./auth.service";

export interface Book {
  BookID: number;
  Title: string;
  ISBN: string;
  Genre: string;
  AuthorID: number;
  Quantity: number;
}

// Trailing slashes to match typical DRF router conventions —
// adjust if your backend doesn't require them.
const BASE_PATH = "/api/books/";

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

export const BookService = {
  async getAll(signal?: AbortSignal): Promise<Book[]> {
    try {
      const response = await apiClient.get<Book[]>(BASE_PATH, { signal });
      return response.data;
    } catch (error) {
      // Let cancellations propagate as-is so callers can distinguish
      // an aborted request from an actual failure.
      if (error instanceof AxiosError && error.code === "ERR_CANCELED") {
        throw error;
      }
      throw extractErrorMessage(error, "Failed to load books.");
    }
  },

  async create(book: Book): Promise<Book> {
    try {
      const response = await apiClient.post<Book>(BASE_PATH, book);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, "Failed to add book.");
    }
  },

  async update(BookId: string, book: Partial<Book>): Promise<Book> {
    try {
      const response = await apiClient.put<Book>(
        `${BASE_PATH}${BookId}/`,
        book
      );
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, "Failed to update book.");
    }
  },

  async remove(BookId: string): Promise<void> {
    try {
      await apiClient.delete(`${BASE_PATH}${BookId}/`);
    } catch (error) {
      throw extractErrorMessage(error, "Failed to delete book.");
    }
  },
};