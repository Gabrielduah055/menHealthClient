import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import blogImage from "@/assets/blogImage.png";
import cardioImage from "@/assets/cardio.png";
import drugsImage from "@/assets/drugs1.png";
import foodImage from "@/assets/food.png";
import matImage from "@/assets/mat.png";
import vitaminsImage from "@/assets/vitamins.png";
import dumbelImage from "@/assets/dumbel.png";

const categories = [
  "All Posts",
  "Heart Health",
  "Nutrition",
  "Wellness",
  "Preparedness",
  "Mental Health",
];

const featuredStory = {
  slug: "future-of-home-health-monitoring",
  tag: "Editors Pick",
  date: "Nov 12, 2023",
  readTime: "8 min read",
  title: "The Future of Home Health Monitoring: What You Need to Know",
  excerpt:
    "From smart blood pressure monitors to wearable ECGs, technology is revolutionizing how we track our vitals at home.",
  author: "Dr. Sarah Jenkins",
  role: "Chief Medical Officer",
  image: blogImage,
};

const articles = [
  {
    slug: "understanding-blood-pressure-readings",
    tag: "Heart Health",
    title: "Understanding Your Blood Pressure Readings",
    date: "Oct 24, 2023",
    readTime: "5 min read",
    excerpt:
      "Learn what the numbers mean and how to maintain a healthy range through diet and lifestyle.",
    image: cardioImage,
  },
  {
    slug: "essential-first-aid-items",
    tag: "Preparedness",
    title: "Essential First Aid Items for Every Home",
    date: "Oct 20, 2023",
    readTime: "3 min read",
    excerpt:
      "A comprehensive checklist of what you need to keep your family safe in case of minor emergencies.",
    image: drugsImage,
  },
  {
    slug: "nutrition-myths-debunked",
    tag: "Nutrition",
    title: "Nutrition Myths Debunked: Fact vs Fiction",
    date: "Oct 18, 2023",
    readTime: "6 min read",
    excerpt:
      "We consult top nutritionists to separate scientific fact from popular diet fiction.",
    image: foodImage,
  },
  {
    slug: "mental-health-benefits-of-daily-exercise",
    tag: "Wellness",
    title: "The Mental Health Benefits of Daily Exercise",
    date: "Oct 10, 2023",
    readTime: "4 min read",
    excerpt:
      "It’s not just about the body. Discover how 30 minutes of movement can transform your mindset.",
    image: matImage,
  },
  {
    slug: "science-of-sleep-restore-your-rhythm",
    tag: "Wellness",
    title: "The Science of Sleep: How to Restore Your Rhythm",
    date: "Oct 04, 2023",
    readTime: "7 min read",
    excerpt:
      "Struggling with insomnia? Experts explain the steps to better sleep hygiene tonight.",
    image: vitaminsImage,
  },
  {
    slug: "childproofing-101-new-parents",
    tag: "Preparedness",
    title: "Childproofing 101: A Guide for New Parents",
    date: "Sep 28, 2023",
    readTime: "5 min read",
    excerpt:
      "From cabinet locks to corner guards, ensure your home is a safe environment.",
    image: dumbelImage,
  },
];

export default function BlogPage() {
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
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={
                  index === 0
                    ? "rounded-full bg-slate-900 px-4 py-2 text-white"
                    : "rounded-full border border-violet-100 bg-white px-4 py-2 text-slate-500"
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="h-full min-h-[320px] md:min-h-[360px] lg:min-h-[420px]">
              <Image
                src={featuredStory.image}
                alt={featuredStory.title}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-between px-6 py-10 lg:px-8">
              <div>
                <span className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-[10px] font-semibold uppercase text-white">
                  {featuredStory.tag}
                </span>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span>{featuredStory.date}</span>
                  <span>•</span>
                  <span>{featuredStory.readTime}</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  {featuredStory.title}
                </h2>
                <p className="mt-3 text-sm text-slate-500">
                  {featuredStory.excerpt}
                </p>
              </div>

              <div className="mt-6">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {featuredStory.author}
                  </p>
                  <p className="text-xs text-slate-400">{featuredStory.role}</p>
                </div>
                <Link
                  href={`/blog/${featuredStory.slug}`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-violet-200 bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:border-violet-300"
                >
                  Read Full Article
                  <i className="uil uil-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
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
              className="relative h-full min-h-[320px] flex flex-col overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link
                href={`/blog/${article.slug}`}
                aria-label={`Read ${article.title}`}
                className="absolute inset-0 z-10"
              />
              <div className="relative h-60">
                <span className="absolute left-4 top-4 rounded-full bg-violet-100 px-3 py-1 text-[10px] font-semibold uppercase text-violet-600">
                  {article.tag}
                </span>
                <Image
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex h-full flex-col px-5 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h4 className="mt-2 text-base font-semibold text-slate-900">
                  {article.title}
                </h4>
                <p className="mt-2 text-xs text-slate-500">{article.excerpt}</p>
                <span className="mt-auto pt-4 text-xs font-semibold text-violet-600">
                  Read Article
                </span>
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
          Showing 6 of 42 articles
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
