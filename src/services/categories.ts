import { apiFetch } from "@/lib/api";

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

export const getCategories = (init?: RequestInit) =>
  apiFetch<Category[]>("/api/categories", init);
