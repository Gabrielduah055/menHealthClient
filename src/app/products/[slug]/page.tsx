import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug, products } from "@/data/products";

export const revalidate = 60;
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="bg-[var(--background)] text-slate-900">
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-6 pt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <Link href="/" className="transition hover:text-slate-600">
            Home
          </Link>
          <i className="uil uil-angle-right text-sm" />
          <Link href="/products" className="transition hover:text-slate-600">
            Shop
          </Link>
          <i className="uil uil-angle-right text-sm" />
          <span className="text-slate-600">{product.name}</span>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
              <div className="flex h-80 items-center justify-center rounded-2xl bg-violet-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-auto object-contain"
                  priority
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {gallery.map((image, index) => (
                  <div
                    key={`${product.slug}-${index}`}
                    className="flex h-20 items-center justify-center rounded-2xl border border-violet-100 bg-white"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase text-violet-600">
                {product.category}
              </span>
              {product.badge ? (
                <span className="rounded-full bg-rose-500 px-3 py-1 text-[10px] font-semibold uppercase text-white">
                  {product.badge}
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">
              {product.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-amber-400">
                <i className="uil uil-star" />
                <span className="font-semibold text-slate-700">
                  {product.rating}
                </span>
                <span className="text-slate-400">
                  ({product.reviews} reviews)
                </span>
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${
                  product.stock === "Low Stock"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {product.stock}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-violet-600">
              {product.price}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              {product.longDescription}
            </p>

            <div className="mt-6 space-y-3">
              {product.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <i className="uil uil-check" />
                  </span>
                  <span className="text-slate-600">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <AddToCartButton
                product={product}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-500"
                label="Add to Cart"
              />
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300"
              >
                <i className="uil uil-heart" />
                Save for Later
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Free Delivery",
                  description: "Orders over GHS 500 ship free.",
                },
                {
                  title: "Secure Checkout",
                  description: "Trusted payments and fast support.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-violet-100 bg-white p-4 text-sm text-slate-600"
                >
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Product Details
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              {product.longDescription}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-xs"
                >
                  <span className="text-slate-500">{spec.label}</span>
                  <span className="font-semibold text-slate-700">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              What's Included
            </h3>
            <div className="mt-4 space-y-3">
              {product.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <i className="uil uil-check" />
                  </span>
                  <span className="text-slate-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Related Products
          </h3>
          <Link href="/products" className="text-sm font-semibold text-violet-600">
            View All
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((item) => (
            <article
              key={item.slug}
              className="relative flex h-full flex-col rounded-3xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link
                href={`/products/${item.slug}`}
                aria-label={`View ${item.name}`}
                className="absolute inset-0 z-10 rounded-3xl"
              />
              <div className="flex h-36 items-center justify-center rounded-2xl bg-violet-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h4 className="mt-4 text-sm font-semibold text-slate-900">
                {item.name}
              </h4>
              <p className="mt-1 text-xs text-slate-500">{item.description}</p>
              <span className="mt-3 text-sm font-semibold text-violet-600">
                {item.price}
              </span>
            </article>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
