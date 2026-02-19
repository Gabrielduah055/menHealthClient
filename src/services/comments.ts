import { apiFetch } from "@/lib/api";

export type CommentReply = {
  name: string;
  content: string;
  createdAt: string;
};

export type Comment = {
  _id: string;
  postId: string;
  userId?: string;
  name: string;
  email: string;
  content: string;
  isApproved: boolean;
  shareToken: string;
  shareCount: number;
  replies: CommentReply[];
  createdAt: string;
  updatedAt: string;
};

export const getPostComments = (postId: string, init?: RequestInit) =>
  apiFetch<Comment[]>(`/api/blogs/${postId}/comments`, init);

export const addComment = (postId: string, content: string) =>
  apiFetch<Comment>(`/api/blogs/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
