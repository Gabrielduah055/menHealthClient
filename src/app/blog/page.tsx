import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import blogImage from "@/assets/blogImage.png";
import { getPublicBlogs } from "@/services/blogs";
import { getCategories } from "@/services/categories";
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

const extractText = (html?: string) =>
  (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getExcerpt = (post: BlogPost) => {
  const base = post.excerpt ? extractText(post.excerpt) : extractText(post.content);
  if (!base) return "Read the latest health insights.";
  return base.length > 160 ? `${base.slice(0, 160).trim()}...` : base;
};

const getTagLabel = (post: BlogPost) => {
  if (post.category && typeof post.category === "object" && "name" in post.category) {
    return post.category.name || "Health";
  }
  if (post.tags?.length) return post.tags[0];
  if (post.topics?.length) return post.topics[0].replace(/^#/, "");
  return "Health";
};

const getReadTime = (post: BlogPost) => post.readTime || "5 min read";

const getCoverImage = (post: BlogPost) => post.coverImageUrl || blogImage;

const buildAvatarLabel = (name: string) => {
  if (!name) return "AD";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return initials || "AD";
};

const getAuthor = (post: BlogPost) => {
  const name = post.author?.name || "Admin";
  return {
    name,
    role: post.author?.role || "Administrator",
    avatarLabel: post.author?.avatarLabel || buildAvatarLabel(name),
  };
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolved = (await searchParams) ?? {};
  const selectedCategory = resolved.category || "all";
  let posts: BlogPost[] = [];
  let categories: { name: string; slug: string }[] = [];
  try {
    const [blogs, apiCategories] = await Promise.all([
      getPublicBlogs(
        { next: { revalidate } },
        selectedCategory !== "all" ? { category: selectedCategory } : undefined
      ),
      getCategories({ next: { revalidate } }),
    ]);
    posts = blogs;
    categories = apiCategories.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
    }));
  } catch (error) {
    console.error("Failed to load blogs", error);
  }

  const featuredPost = posts[0];
  const articles = posts.slice(1);
  const categoryChips = [
    { label: "All Posts", slug: "all" },
    ...categories.map((cat) => ({ label: cat.name, slug: cat.slug })),
  ];

  return (
    <div className="bg-[var(--background)] text-slate-900">
      <AnimatedSection className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.14),transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
              Editorial Research
            </span>
            <h1 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">
              Health & Wellness <span className="text-violet-600">Insights</span>
            </h1>
            <p className="mt-4 text-sm text-slate-500 md:text-base">
              Expert advice, latest medical research, and practical tips to help
              you live a healthier, happier life.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-full border border-violet-100 bg-white px-4 py-2 shadow-sm sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2 text-sm text-slate-400">
                <i className="uil uil-search" />
                <input
                  type="text"
                  placeholder="Search for health topics..."
                  className="w-full bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-500">
            {categoryChips.map((category) => {
              const isActive = category.slug === selectedCategory;
              return (
                <Link
                  key={category.slug}
                  href={
                    category.slug === "all"
                      ? "/blog"
                      : `/blog?category=${category.slug}`
                  }
                  className={
                    isActive
                      ? "rounded-full bg-slate-900 px-4 py-2 text-white"
                      : "rounded-full border border-violet-100 bg-white px-4 py-2 text-slate-500"
                  }
                >
                  {category.label}
                </Link>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        {featuredPost ? (
          <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-0">
              <div className="relative h-[360px] md:h-[420px] lg:h-[460px]">
                <Image
                  src={getCoverImage(featuredPost)}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="flex flex-col justify-between px-6 py-10 lg:px-8">
                <div>
                  <span className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-[10px] font-semibold uppercase text-white">
                    {getTagLabel(featuredPost)}
                  </span>
                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                    <span>{formatDate(featuredPost.publishedAt || featuredPost.createdAt)}</span>
                    <span>•</span>
                    <span>{getReadTime(featuredPost)}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-500 line-clamp-3">
                    {getExcerpt(featuredPost)}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600">
                      {getAuthor(featuredPost).avatarLabel}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {getAuthor(featuredPost).name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {getAuthor(featuredPost).role}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug || featuredPost._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-violet-200 bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:border-violet-300"
                  >
                    Read Full Article
                    <i className="uil uil-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-violet-200 bg-white p-10 text-center text-sm text-slate-500">
            No blog posts yet. Check back soon.
          </div>
        )}
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Articles
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            Sort by:
            <span className="text-slate-600">Newest First</span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link
                href={`/blog/${article.slug || article._id}`}
                aria-label={`Read ${article.title}`}
                className="absolute inset-0 z-10"
              />
              {/* Image area */}
              <div className="relative h-52 overflow-hidden">
                <span className="absolute left-3 top-3 z-20 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {getTagLabel(article)}
                </span>
                <Image
                  src={getCoverImage(article)}
                  alt={article.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              {/* Content area */}
              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <p className="text-xs">
                  <span className="text-violet-500">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </span>
                  <span className="mx-1.5 text-slate-300">•</span>
                  <span className="text-slate-400">
                    {getReadTime(article)}
                  </span>
                </p>
                <h4 className="mt-2.5 text-base font-bold leading-snug text-slate-900">
                  {article.title}
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500 line-clamp-3">
                  {getExcerpt(article)}
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-sm font-semibold text-violet-600 transition group-hover:text-violet-500">
                    Read Article
                  </span>
                  <span className="z-20 flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:text-violet-500">
                    <i className="uil uil-bookmark text-lg" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600"
          >
            Load More Articles
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          Showing {articles.length} of {posts.length} articles
        </p>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-violet-100 via-violet-200 to-violet-100 px-6 py-10 md:px-10">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Join the Pulse
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Subscribe for exclusive health tips, new product arrivals, and
                member-only discounts.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border border-white bg-white/80 px-5 py-3 text-sm text-slate-700 shadow-sm focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
              <button
                type="button"
                className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-500"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-slate-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
