import { apiFetch } from "@/lib/api";
import type { BlogPost } from "@/types/blog";

export const getPublicBlogs = () => apiFetch<BlogPost[]>("/api/blogs");

export const getPublicBlogBySlug = (slug: string) =>
  apiFetch<BlogPost>(`/api/blogs/${slug}`);

export const incrementBlogView = (id: string) =>
  apiFetch<{ views: number }>(`/api/blogs/${id}/view`, {
    method: "POST",
  });
