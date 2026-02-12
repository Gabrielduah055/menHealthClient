import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { blogs, getBlogBySlug } from "@/data/blogs";

export const revalidate = 60;

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = post.sections.map((section) => section.title);
  const related = blogs.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-[var(--background)] text-slate-900">
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
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="space-y-8">
            <div>
              <span className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-[10px] font-semibold uppercase text-white">
                {post.tag}
              </span>
              <h1 className="mt-4 text-3xl font-semibold text-slate-900">
                {post.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600">
                    {post.author.avatarLabel}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      {post.author.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {post.author.role}
                    </p>
                  </div>
                </div>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white">
              <Image
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="space-y-6 text-sm text-slate-600">
              {post.sections.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {section.title}
                  </h2>
                  <p>{section.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-violet-100 bg-violet-50 px-6 py-6 text-sm text-slate-600">
              <p className="text-base font-semibold text-violet-600">
                “{post.quote}”
              </p>
              <p className="mt-4 text-xs text-slate-400">{post.author.name}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {post.gallery.map((image, index) => (
                <div
                  key={`${post.slug}-gallery-${index}`}
                  className="overflow-hidden rounded-2xl border border-violet-100"
                >
                  <Image
                    src={image}
                    alt={`${post.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              {post.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-violet-100 bg-white px-3 py-1"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="rounded-3xl border border-violet-100 bg-violet-50 px-6 py-6 text-center text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Share this article</p>
              <p className="mt-2 text-xs text-slate-500">
                Found this helpful? Share it with your friends and community.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                {["facebook", "twitter", "linkedin", "whatsapp"].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-100 bg-white text-slate-500"
                  >
                    <i className={`uil uil-${icon}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-violet-100 bg-white px-6 py-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">Discussion (2)</p>
                <button
                  type="button"
                  className="text-xs text-slate-400"
                >
                  Sort by: Top Comments
                </button>
              </div>
              <div className="mt-4 space-y-3">
                <textarea
                  rows={4}
                  placeholder="Share your thoughts or ask a question..."
                  className="w-full rounded-2xl border border-violet-100 px-4 py-3 text-sm text-slate-600"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="rounded-2xl border border-violet-100 px-4 py-2 text-sm text-slate-600"
                  />
                  <input
                    type="email"
                    placeholder="Email (private)"
                    className="rounded-2xl border border-violet-100 px-4 py-2 text-sm text-slate-600"
                  />
                </div>
                <button
                  type="button"
                  className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-violet-100 bg-white p-6">
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

            <div className="rounded-3xl border border-violet-100 bg-white p-6">
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
                        src={entry.coverImage}
                        alt={entry.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        {entry.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {entry.readTime}
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
