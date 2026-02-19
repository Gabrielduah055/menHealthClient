export type BlogAuthor = {
  id?: string;
  name?: string;
  role?: string;
  avatarLabel?: string;
};

export type BlogSection = {
  title: string;
  body: string;
};

export type BlogCategory = {
  _id: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  excerpt?: string;
  content: string;
  status: "draft" | "published";
  tags: string[];
  topics?: string[];
  category?: BlogCategory | string;
  author?: BlogAuthor;
  sections?: BlogSection[];
  quote?: string;
  gallery?: string[];
  readTime?: string;
  featuredLabel?: string;
  isFeatured?: boolean;
  views?: number;
  allowComments: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
