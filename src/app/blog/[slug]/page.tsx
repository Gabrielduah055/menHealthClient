import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons";
import blogImage from "@/assets/blogImage.png";
import { getPublicBlogBySlug, getPublicBlogs } from "@/services/blogs";
import type { BlogPost } from "@/types/blog";

export const revalidate = 60;

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const buildAvatarLabel = (name?: string) => {
  if (!name) return "AD";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return initials || "AD";
};

const getTagLabel = (post: BlogPost) => {
  if (post.category && typeof post.category === "object" && "name" in post.category) {
    return post.category.name || "Health";
  }
  if (post.tags?.length) return post.tags[0];
  if (post.topics?.length) return post.topics[0].replace(/^#/, "");
  return "Health";
};

export async function generateStaticParams() {
  try {
    const blogs = await getPublicBlogs({ next: { revalidate } });
    return blogs.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  let allPosts: BlogPost[] = [];

  try {
    const [current, blogs] = await Promise.all([
      getPublicBlogBySlug(slug, { next: { revalidate } }),
      getPublicBlogs({ next: { revalidate } }),
    ]);
    post = current;
    allPosts = blogs;
  } catch (error) {
    console.error("Failed to load blog", error);
  }

  if (!post) {
    notFound();
  }

  const toc = (post.sections || []).map((section) => section.title).filter(Boolean);
  const related = allPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);
  const authorName = post.author?.name || "Admin";
  const authorRole = post.author?.role || "Administrator";
  const authorAvatar =
    post.author?.avatarLabel || buildAvatarLabel(post.author?.name || authorName);
  const contentHtml = post.content || "";
  const hasHtmlQuote = contentHtml.includes("<blockquote");
  const hasHtmlImages = contentHtml.includes("<img");
  const topics = post.topics?.length
    ? post.topics
    : post.tags?.length
      ? post.tags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
      : [];

  return (
    <div className="bg-[var(--background)] text-slate-900 overflow-x-hidden">
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-6 pt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <Link href="/blog" className="transition hover:text-slate-600">
            Blog
          </Link>
          <i className="uil uil-angle-right text-sm" />
          <span className="text-slate-600">{post.title}</span>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] max-w-6xl mx-auto min-w-0">
          <article className="space-y-8 min-w-0">
            <div>
              <span className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-[10px] font-semibold uppercase text-white">
                {getTagLabel(post)}
              </span>
              <h1 className="mt-4 text-4xl font-semibold text-slate-900">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600">
                    {authorAvatar}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      {authorName}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {authorRole}
                    </p>
                  </div>
                </div>
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                <span>{post.readTime || "5 min read"}</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
              <Image
                src={post.coverImageUrl || blogImage}
                alt={post.title}
                width={1200}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div
              className="blog-content space-y-6 text-sm text-slate-600"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {post.quote && !hasHtmlQuote && (
              <div className="rounded-3xl border border-violet-100 bg-violet-50 px-6 py-6 text-sm text-slate-600">
                <p className="text-base font-semibold text-violet-600">
                  “{post.quote}”
                </p>
                <p className="mt-4 text-xs text-slate-400">{authorName}</p>
              </div>
            )}

            {post.gallery && post.gallery.length > 0 && !hasHtmlImages && (
              <div className="grid gap-4 sm:grid-cols-2">
                {post.gallery.map((image, index) => (
                  <div
                    key={`${post.slug}-gallery-${index}`}
                    className="overflow-hidden rounded-2xl border border-violet-100"
                  >
                    <Image
                      src={image}
                      alt={`${post.title} ${index + 1}`}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {topics.length > 0 && (
              <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-violet-100 bg-white px-3 py-1"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <ShareButtons slug={post.slug} title={post.title} />

            <CommentSection postId={post._id} />
          </article>

          <aside className="space-y-6 min-w-0">
            <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-400 mb-3">About the author</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
                  {authorAvatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{authorName}</p>
                  <p className="text-xs text-slate-400">{authorRole}</p>
                </div>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-600"
              >
                View Profile
              </button>
            </div>

            <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Table of Contents
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {toc.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Related Articles
              </p>
              <div className="mt-4 space-y-4">
                {related.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/blog/${entry.slug}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-violet-50">
                      <Image
                        src={entry.coverImageUrl || blogImage}
                        alt={entry.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        {entry.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {entry.readTime || "5 min read"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </AnimatedSection>
    </div>
  );
}
