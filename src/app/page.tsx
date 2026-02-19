import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import heroImage from "@/assets/hero.png";
import checkImage from "@/assets/check.png";
import blogPlaceholder from "@/assets/blogImage.png";
import { getPublicBlogs } from "@/services/blogs";
import { getPublicProducts } from "@/services/products";
import type { BlogPost } from "@/types/blog";
import type { Product } from "@/types/product";

const perks = [
  { icon: "uil-shield-check", text: "Trusted by Experts" },
  { icon: "uil-truck", text: "Free Shipping · GHS 500+" },
  { icon: "uil-headphones", text: "24/7 Support" },
];

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

const getTagLabel = (post: BlogPost) => {
  if (
    post.category &&
    typeof post.category === "object" &&
    "name" in post.category
  ) {
    return post.category.name || "Health";
  }
  if (post.tags?.length) return post.tags[0];
  if (post.topics?.length) return post.topics[0].replace(/^#/, "");
  return "Health";
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

const formatPrice = (price: number) =>
  `GHS ${price.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;

export default async function Home() {
  let blogs: BlogPost[] = [];
  let products: Product[] = [];

  try {
    const [blogData, productData] = await Promise.all([
      getPublicBlogs({ next: { revalidate: 60 } }),
      getPublicProducts(),
    ]);
    blogs = blogData.slice(0, 3);
    products = productData.slice(0, 4);
  } catch (error) {
    console.error("Failed to load home page data", error);
  }

  return (
    <div className="bg-[var(--background)] text-slate-900">
      {/* ─── Hero ─── */}
      <AnimatedSection className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_60%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              New wellness collection
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Your Health,
              <span className="block text-violet-600">Simplified.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
              Discover expert medical advice and shop premium health equipment
              designed to help you live a better, healthier life today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-500"
              >
                <i className="uil uil-shopping-bag" />
                Shop Equipment
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300"
              >
                Read Our Blog
                <i className="uil uil-arrow-right" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-xs font-semibold text-slate-500">
              {perks.map((perk) => (
                <span key={perk.text} className="flex items-center gap-2">
                  <i className={`uil ${perk.icon} text-violet-500`} />
                  {perk.text}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-violet-100 bg-white shadow-xl shadow-violet-200">
              <Image
                src={heroImage}
                alt="Doctor consulting with patient"
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-violet-200">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                <Image src={checkImage} alt="Verified" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Clinically Verified
                </p>
                <p className="text-xs text-slate-500">
                  All products tested
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Blog Section ─── */}
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Latest from the Blog
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Stay informed with the latest health tips and research.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600"
          >
            View all articles
            <i className="uil uil-arrow-right" />
          </Link>
        </div>

        {blogs.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {blogs.map((post) => (
              <article
                key={post._id}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                  className="absolute inset-0 z-10"
                />
                {/* Image area */}
                <div className="relative h-52 overflow-hidden">
                  <span className="absolute left-3 top-3 z-20 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                    {getTagLabel(post)}
                  </span>
                  <Image
                    src={post.coverImageUrl || blogPlaceholder}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Content area */}
                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <p className="text-xs">
                    <span className="text-violet-500">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    <span className="mx-1.5 text-slate-300">•</span>
                    <span className="text-slate-400">
                      {post.readTime || "5 min read"}
                    </span>
                  </p>
                  <h3 className="mt-2.5 text-base font-bold leading-snug text-slate-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-500 line-clamp-3">
                    {stripHtml(post.excerpt || "Read the latest health insights.")}
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
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-violet-200 bg-white p-10 text-center text-sm text-slate-500">
            No blog posts available right now. Check back soon!
          </div>
        )}
      </AnimatedSection>

      {/* ─── Products Section ─── */}
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            Featured Products
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Premium equipment recommended by healthcare professionals for home
            use.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="relative flex h-full flex-col rounded-3xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="absolute inset-0 z-10 rounded-3xl"
                />
                <button
                  type="button"
                  aria-label="Save product"
                  className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-violet-100 text-slate-400 transition hover:text-violet-600"
                >
                  <i className="uil uil-heart" />
                </button>
                <div className="flex h-40 items-center justify-center rounded-2xl bg-violet-50">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-28 w-auto object-contain"
                    />
                  ) : (
                    <i className="uil uil-box text-3xl text-violet-300" />
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${product.stockQty <= 5
                      ? "bg-orange-100 text-orange-600"
                      : "bg-emerald-100 text-emerald-600"
                      }`}
                  >
                    {product.stockQty <= 0
                      ? "Out of Stock"
                      : product.stockQty <= 5
                        ? "Low Stock"
                        : "In Stock"}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-sm font-semibold text-violet-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className="z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm transition hover:bg-violet-500">
                    <i className="uil uil-shopping-bag" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-violet-200 bg-white p-10 text-center text-sm text-slate-500">
            Products are loading or temporarily unavailable.
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300"
          >
            View All Products
          </Link>
        </div>
      </AnimatedSection>

      {/* ─── Newsletter ─── */}
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-violet-100 via-violet-200 to-violet-100 px-6 py-10 md:px-10">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Join the Pulse
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Subscribe to our newsletter for exclusive health tips, new
                product arrivals, and member-only discounts.
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
