import { apiFetch } from "@/lib/api";
import type { BlogPost } from "@/types/blog";

type BlogQuery = {
  category?: string;
};

export const getPublicBlogs = (init?: RequestInit, query?: BlogQuery) => {
  const params = query?.category
    ? `?category=${encodeURIComponent(query.category)}`
    : "";
  return apiFetch<BlogPost[]>(`/api/blogs${params}`, init);
};

export const getPublicBlogBySlug = (slug: string, init?: RequestInit) =>
  apiFetch<BlogPost>(`/api/blogs/${slug}`, init);

export const incrementBlogView = (id: string) =>
  apiFetch<{ views: number }>(`/api/blogs/${id}/view`, {
    method: "POST",
  });
