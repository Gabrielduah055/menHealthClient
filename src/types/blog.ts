export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  excerpt?: string;
  content: string;
  status: "draft" | "published";
  tags: string[];
  category?: string;
  views?: number;
  allowComments: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
