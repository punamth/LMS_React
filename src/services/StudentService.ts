import { AxiosError } from "axios";
import { apiClient } from "./auth.service";

export interface Student {
  student_id: number;
  name: string;
  email: string;
  contact_number: string;
  department: string;
}

const BASE_PATH = "/api/students/";

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

export const StudentService = {
  async getAll(signal?: AbortSignal): Promise<Student[]> {
    try {
      const response = await apiClient.get<Student[]>(BASE_PATH, { signal });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.code === "ERR_CANCELED") {
        throw error;
      }
      throw extractErrorMessage(error, "Failed to load students.");
    }
  },

  async create(student: Student): Promise<Student> {
    try {
      const response = await apiClient.post<Student>(BASE_PATH, student);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, "Failed to add student.");
    }
  },

  async update(studentId: string, student: Partial<Student>): Promise<Student> {
    try {
      const response = await apiClient.put<Student>(
        `${BASE_PATH}${studentId}/`,
        student
      );
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, "Failed to update student.");
    }
  },

  async remove(studentId: string): Promise<void> {
    try {
      await apiClient.delete(`${BASE_PATH}${studentId}/`);
    } catch (error) {
      throw extractErrorMessage(error, "Failed to delete student.");
    }
  },
};