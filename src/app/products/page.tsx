import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AddToCartButton from "@/components/AddToCartButton";
import { getPublicProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import type { Product } from "@/types/product";

export const revalidate = 60;

const formatPrice = (price: number) =>
  `GHS ${price.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;

const getStockLabel = (qty: number) => {
  if (qty <= 0) return { label: "Out of Stock", style: "bg-red-100 text-red-600" };
  if (qty <= 5) return { label: "Low Stock", style: "bg-orange-100 text-orange-600" };
  return { label: "In Stock", style: "bg-emerald-100 text-emerald-600" };
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; sort?: string }>;
}) {
  const resolved = (await searchParams) ?? {};
  const selectedCategory = resolved.category || "all";
  const sortBy = resolved.sort || "newest";

  let allProducts: Product[] = [];
  let categories: { name: string; slug: string }[] = [];

  try {
    const [productData, categoryData] = await Promise.all([
      getPublicProducts(),
      getCategories({ next: { revalidate } }),
    ]);
    allProducts = productData;
    categories = categoryData.map((cat) => ({ name: cat.name, slug: cat.slug }));
  } catch (error) {
    console.error("Failed to load products", error);
  }

  // Sort
  const sortedProducts = [...allProducts];
  if (sortBy === "price-low") sortedProducts.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") sortedProducts.sort((a, b) => b.price - a.price);
  // default: newest (already sorted by createdAt desc from API)

  const categoryChips = [
    { label: "All Products", slug: "all" },
    ...categories.map((cat) => ({ label: cat.name, slug: cat.slug })),
  ];

  return (
    <div className="bg-[var(--background)] text-slate-900">
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-6 pt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <Link href="/" className="transition hover:text-slate-600">
            Home
          </Link>
          <i className="uil uil-angle-right text-sm" />
          <span className="text-slate-600">Shop All Products</span>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* ─── Sidebar Filters ─── */}
          <aside className="hidden lg:block">
            <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <i className="uil uil-filter text-violet-600" />
                Categories
              </div>
              <div className="mt-4 space-y-2">
                {categoryChips.map((category) => {
                  const isActive = category.slug === selectedCategory;
                  return (
                    <Link
                      key={category.slug}
                      href={
                        category.slug === "all"
                          ? "/products"
                          : `/products?category=${category.slug}`
                      }
                      className={`block rounded-xl px-3 py-2 text-sm transition ${isActive
                        ? "bg-violet-600 font-semibold text-white"
                        : "text-slate-600 hover:bg-violet-50"
                        }`}
                    >
                      {category.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-violet-100 pt-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <i className="uil uil-dollar-sign text-violet-600" />
                  Price Range
                </div>
                <div className="mt-4 space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    defaultValue="650"
                    className="w-full accent-violet-600"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>GHS 0</span>
                    <span>GHS 2000+</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ─── Product Grid ─── */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Shop All Products
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Showing {sortedProducts.length} result
                  {sortedProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <label className="flex items-center gap-3 text-sm text-slate-500">
                Sort by:
                <select
                  className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-violet-300 focus:outline-none"
                  defaultValue={sortBy}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </label>
            </div>

            {/* Mobile category chips */}
            <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
              {categoryChips.map((category) => {
                const isActive = category.slug === selectedCategory;
                return (
                  <Link
                    key={category.slug}
                    href={
                      category.slug === "all"
                        ? "/products"
                        : `/products?category=${category.slug}`
                    }
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${isActive
                      ? "bg-violet-600 text-white"
                      : "border border-violet-100 bg-white text-slate-500"
                      }`}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </div>

            {sortedProducts.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sortedProducts.map((product) => {
                  const stock = getStockLabel(product.stockQty);
                  return (
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
                      <div className="flex h-44 items-center justify-center rounded-2xl bg-violet-50">
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
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${stock.style}`}
                        >
                          {stock.label}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-slate-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {product.description
                          ? product.description
                            .replace(/<[^>]*>/g, "")
                            .replace(/&nbsp;/gi, " ")
                            .replace(/\s+/g, " ")
                            .trim()
                          : "Health product"}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-sm font-semibold text-violet-600">
                          {formatPrice(product.price)}
                        </span>
                        <AddToCartButton
                          product={product}
                          iconOnly
                          className="relative z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm transition hover:bg-violet-500"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-violet-200 bg-white p-10 text-center text-sm text-slate-500">
                No products found. Try a different category or check back later.
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
