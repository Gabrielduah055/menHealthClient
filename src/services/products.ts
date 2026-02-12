import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

export const getPublicProducts = () => apiFetch<Product[]>("/api/products");

export const getPublicProductBySlug = (slug: string) =>
  apiFetch<Product>(`/api/products/${slug}`);
