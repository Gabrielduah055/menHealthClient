import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import heroImage from "@/assets/hero.png";
import checkImage from "@/assets/check.png";
import blogA from "@/assets/drugs1.png";
import blogB from "@/assets/food.png";
import blogC from "@/assets/machine.png";
import productA from "@/assets/machine1.png";
import productB from "@/assets/termometer.png";
import productC from "@/assets/cardio.png";
import productD from "@/assets/machine.png";

const blogPosts = [
  {
    tag: "Heart Health",
    title: "Understanding Your Blood Pressure Readings",
    excerpt:
      "Learn what the numbers mean and how to maintain a healthy range.",
    image: blogA,
    date: "Oct 24, 2025",
    readTime: "5 min read",
  },
  {
    tag: "Preparedness",
    title: "Essential First Aid Items for Every Home",
    excerpt:
      "A comprehensive checklist to help your family stay prepared.",
    image: blogB,
    date: "Oct 20, 2025",
    readTime: "3 min read",
  },
  {
    tag: "Wellness",
    title: "Nutrition Myths Debunked: Fact vs Fiction",
    excerpt:
      "We consult top nutritionists to separate science from popular diet trends.",
    image: blogC,
    date: "Oct 15, 2025",
    readTime: "6 min read",
  },
];

const products = [
  {
    name: "Pro BP Monitor",
    description: "Digital upper arm cuff",
    price: "$49.99",
    rating: "4.9",
    reviews: "128",
    image: productA,
    badge: null,
  },
  {
    name: "Smart Temp",
    description: "Instant read thermometer",
    price: "$19.99",
    rating: "4.7",
    reviews: "45",
    image: productB,
    badge: "Sale",
  },
  {
    name: "Home Safety Kit",
    description: "120-piece first aid set",
    price: "$34.50",
    rating: "4.8",
    reviews: "89",
    image: productC,
    badge: null,
  },
  {
    name: "Pulse Check",
    description: "Fingertip oximeter",
    price: "$24.99",
    rating: "4.6",
    reviews: "210",
    image: productD,
    badge: null,
  },
];

const perks = [
  { icon: "uil-shield-check", text: "Trusted by Experts" },
  { icon: "uil-truck", text: "Free Shipping · $50+" },
  { icon: "uil-headphones", text: "24/7 Support" },
];

export default function Home() {
  return (
    <div className="bg-[var(--background)] text-slate-900">
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

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-44">
                <span className="absolute left-4 top-4 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase text-violet-600">
                  {post.tag}
                </span>
                <Image
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex h-full flex-col p-5">
                <p className="text-xs text-slate-400">
                  {post.date} · {post.readTime}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{post.excerpt}</p>
                <Link
                  href="/blog"
                  className="mt-auto pt-4 text-sm font-semibold text-violet-600"
                >
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </AnimatedSection>

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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.name}
              className="relative flex h-full flex-col rounded-3xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {product.badge ? (
                <span className="absolute left-5 top-5 rounded-full bg-rose-500 px-2 py-1 text-[10px] font-semibold uppercase text-white">
                  {product.badge}
                </span>
              ) : null}
              <button
                type="button"
                aria-label="Save product"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-violet-100 text-slate-400 transition hover:text-violet-600"
              >
                <i className="uil uil-heart" />
              </button>
              <div className="flex h-40 items-center justify-center rounded-2xl bg-violet-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="h-28 w-auto object-contain"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-amber-400">
                <i className="uil uil-star" />
                <span className="font-semibold text-slate-700">
                  {product.rating}
                </span>
                <span className="text-slate-400">({product.reviews})</span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {product.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-sm font-semibold text-violet-600">
                  {product.price}
                </span>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm transition hover:bg-violet-500"
                  aria-label="Add to cart"
                >
                  <i className="uil uil-shopping-bag" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300"
          >
            View All Products
          </Link>
        </div>
      </AnimatedSection>

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
