import { AxiosError } from "axios";
import { apiClient } from "./auth.service";

export interface Author {
  AuthorID: number;
  Name: string;
  Bio: string;
}

// Trailing slashes to match typical DRF router conventions —
// adjust if your backend doesn't require them.
const BASE_PATH = "/api/authors/";

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

export const AuthorService = {
  async getAll(signal?: AbortSignal): Promise<Author[]> {
    try {
      const response = await apiClient.get<Author[]>(BASE_PATH, { signal });
      return response.data;
    } catch (error) {
      // Let cancellations propagate as-is so callers can distinguish
      // an aborted request from an actual failure.
      if (error instanceof AxiosError && error.code === "ERR_CANCELED") {
        throw error;
      }
      throw extractErrorMessage(error, "Failed to load authors.");
    }
  },

  async create(author: Author): Promise<Author> {
    try {
      const response = await apiClient.post<Author>(BASE_PATH, author);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, "Failed to add author.");
    }
  },

  async update(authorId: string, author: Partial<Author>): Promise<Author> {
    try {
      const response = await apiClient.put<Author>(
        `${BASE_PATH}${authorId}/`,
        author
      );
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, "Failed to update author.");
    }
  },

  async remove(authorId: string): Promise<void> {
    try {
      await apiClient.delete(`${BASE_PATH}${authorId}/`);
    } catch (error) {
      throw extractErrorMessage(error, "Failed to delete author.");
    }
  },
};