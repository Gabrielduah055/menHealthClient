"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { addComment, getPostComments } from "@/services/comments";
import type { Comment } from "@/services/comments";
import { ApiError } from "@/lib/api";

const MAX_LENGTH = 500;
const MIN_LENGTH = 5;

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const buildInitials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";

type Props = {
  postId: string;
};

export default function CommentSection({ postId }: Props) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingComments(true);
    getPostComments(postId)
      .then((data) => {
        if (!cancelled) setComments(data);
      })
      .catch(() => {
        if (!cancelled) setComments([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingComments(false);
      });
    return () => {
      cancelled = true;
    };
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const trimmed = content.trim();
    if (trimmed.length < MIN_LENGTH) {
      setError(`Comment must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Comment must not exceed ${MAX_LENGTH} characters.`);
      return;
    }

    setSubmitting(true);
    try {
      await addComment(postId, trimmed);
      setContent("");
      setSuccessMsg(
        "Your comment has been submitted and is awaiting approval. Thank you!"
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const charsLeft = MAX_LENGTH - content.length;
  const isOverLimit = content.length > MAX_LENGTH;

  return (
    <div
      id="comments"
      className="rounded-3xl border border-violet-100 bg-white px-6 py-6"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-slate-900">
          Discussion
          {comments.length > 0 && (
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({comments.length})
            </span>
          )}
        </p>
      </div>

      {/* Comment Form */}
      <div ref={formRef} className="mb-6">
        {authLoading ? (
          <div className="h-10 animate-pulse rounded-2xl bg-slate-100" />
        ) : !isAuthenticated ? (
          <div className="rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4 text-sm text-slate-600 text-center">
            <p className="mb-2 font-medium text-slate-700">
              Sign in to join the discussion
            </p>
            <Link
              href="/signin"
              className="inline-block rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
            >
              Sign In
            </Link>
            <span className="mx-2 text-slate-400">or</span>
            <Link
              href="/signup"
              className="inline-block rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold text-violet-600 hover:bg-violet-50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600 shrink-0">
                {buildInitials(user!.fullName)}
              </span>
              <span className="text-sm font-medium text-slate-700">
                {user!.fullName}
              </span>
            </div>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(null);
                setSuccessMsg(null);
              }}
              placeholder="Share your thoughts or ask a question..."
              className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-600 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100 resize-none ${
                isOverLimit
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-violet-100"
              }`}
              disabled={submitting}
            />
            <div className="mt-1 flex items-center justify-between">
              <span
                className={`text-xs ${
                  isOverLimit
                    ? "text-red-500 font-medium"
                    : charsLeft <= 50
                      ? "text-amber-500"
                      : "text-slate-400"
                }`}
              >
                {charsLeft} characters remaining
              </span>
              <button
                type="submit"
                disabled={submitting || isOverLimit || content.trim().length < MIN_LENGTH}
                className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Posting…" : "Post Comment"}
              </button>
            </div>

            {error && (
              <div className="mt-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mt-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMsg}
              </div>
            )}
          </form>
        )}
      </div>

      {/* Comments List */}
      {loadingComments ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-100" />
                <div className="h-4 w-32 rounded bg-slate-100" />
              </div>
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-3/4 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-sm text-slate-400 py-4">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <div
              key={comment._id}
              id={`comment-${comment._id}`}
              className="rounded-2xl border border-violet-50 bg-slate-50 px-4 py-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600 shrink-0">
                  {buildInitials(comment.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {comment.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {comment.content}
              </p>

              {comment.replies.length > 0 && (
                <div className="mt-3 space-y-3 border-l-2 border-violet-200 pl-4">
                  {comment.replies.map((reply, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-[10px] font-semibold text-white shrink-0">
                          HP
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-violet-700">
                            {reply.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {formatDate(reply.createdAt)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
