import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import { getPublicProductBySlug, getPublicProducts } from "@/services/products";
import type { Product } from "@/types/product";

export const revalidate = 60;

const formatPrice = (price: number) =>
  `GHS ${price.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;

const getStockLabel = (qty: number) => {
  if (qty <= 0)
    return { label: "Out of Stock", style: "bg-red-100 text-red-600" };
  if (qty <= 5)
    return { label: "Low Stock", style: "bg-orange-100 text-orange-600" };
  return { label: "In Stock", style: "bg-emerald-100 text-emerald-600" };
};

export async function generateStaticParams() {
  try {
    const products = await getPublicProducts();
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product: Product | null = null;
  let allProducts: Product[] = [];

  try {
    const [current, products] = await Promise.all([
      getPublicProductBySlug(slug),
      getPublicProducts(),
    ]);
    product = current;
    allProducts = products;
  } catch (error) {
    console.error("Failed to load product", error);
  }

  if (!product) {
    notFound();
  }

  const stock = getStockLabel(product.stockQty);
  const relatedProducts = allProducts
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="bg-[var(--background)] text-slate-900">
      {/* ─── Breadcrumb ─── */}
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-4 pt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <Link href="/" className="transition hover:text-slate-600">
            Home
          </Link>
          <i className="uil uil-angle-right text-sm" />
          <Link href="/products" className="transition hover:text-slate-600">
            Products
          </Link>
          <i className="uil uil-angle-right text-sm" />
          <span className="text-slate-600">{product.name}</span>
        </div>
      </AnimatedSection>

      {/* ─── Product Hero ─── */}
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <ProductGallery
            images={product.images || []}
            productName={product.name}
          />

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {product.name}
            </h1>

            {/* Reviews placeholder */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="uil uil-star text-sm" />
                ))}
              </div>
              <span className="text-xs text-slate-400">(0 reviews)</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${stock.style}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {stock.label}
              </span>
            </div>

            {/* Price */}
            <p className="mt-6 text-3xl font-bold text-violet-600">
              {formatPrice(product.price)}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AddToCartButton
                product={product}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-500"
                label="Add to Cart"
              />
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border-2 border-violet-600 px-8 py-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3">
                <i className="uil uil-shield-check text-xl text-violet-600" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    2 Year Warranty
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Official manufacturer coverage
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3">
                <i className="uil uil-truck text-xl text-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Free Shipping
                  </p>
                  <p className="text-[10px] text-slate-400">
                    On orders over GHS 500
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Product Description (rich HTML) ─── */}
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Product Description
            </h2>
            {product.description ? (
              <div
                className="prose prose-sm prose-slate mt-4 max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-li:marker:text-violet-500 prose-strong:text-slate-800"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No description available for this product.
              </p>
            )}
          </div>

          {/* Sidebar: Expandable Sections */}
          <div className="space-y-3">
            <details className="group rounded-2xl border border-violet-100 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                Technical Specifications
                <i className="uil uil-angle-down text-lg text-slate-400 transition group-open:rotate-180" />
              </summary>
              <div className="border-t border-violet-100 px-5 py-4 text-sm text-slate-500">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Availability</span>
                    <span className="font-medium text-slate-700">
                      {stock.label} ({product.stockQty} units)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Price</span>
                    <span className="font-medium text-slate-700">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </details>
            <details className="group rounded-2xl border border-violet-100 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                Shipping & Returns
                <i className="uil uil-angle-down text-lg text-slate-400 transition group-open:rotate-180" />
              </summary>
              <div className="border-t border-violet-100 px-5 py-4 text-sm text-slate-500">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="uil uil-check-circle mt-0.5 text-emerald-500" />
                    Free delivery on orders over GHS 500
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="uil uil-check-circle mt-0.5 text-emerald-500" />
                    30-day hassle-free returns
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="uil uil-check-circle mt-0.5 text-emerald-500" />
                    Secure, encrypted payment
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Related Products ─── */}
      {relatedProducts.length > 0 && (
        <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              You may also like
            </h3>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 transition hover:text-violet-500"
            >
              View all
              <i className="uil uil-arrow-right" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <article
                key={item._id}
                className="group relative flex h-full flex-col rounded-2xl border border-violet-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={`/products/${item.slug}`}
                  aria-label={`View ${item.name}`}
                  className="absolute inset-0 z-10 rounded-2xl"
                />
                <button
                  type="button"
                  aria-label="Save product"
                  className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-violet-100 bg-white text-slate-400 transition hover:text-violet-600"
                >
                  <i className="uil uil-heart text-sm" />
                </button>
                <div className="flex h-32 items-center justify-center rounded-xl bg-violet-50">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="h-20 w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <i className="uil uil-box text-2xl text-violet-300" />
                  )}
                </div>
                <h4 className="mt-3 text-sm font-bold text-slate-900">
                  {item.name}
                </h4>
                <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-1">
                  {item.description
                    ? item.description
                      .replace(/<[^>]*>/g, "")
                      .replace(/&nbsp;/gi, " ")
                      .replace(/\s+/g, " ")
                      .trim()
                    : "Health product"}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-sm font-bold text-violet-600">
                    {formatPrice(item.price)}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <i className="uil uil-star text-xs" />
                    <span className="text-[10px] font-medium text-slate-500">
                      —
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
