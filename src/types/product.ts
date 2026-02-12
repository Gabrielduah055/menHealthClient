export type Product = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stockQty: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
