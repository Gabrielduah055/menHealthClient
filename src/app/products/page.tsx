import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";

const categories = [
  { name: "All Products", count: 124, active: true },
  { name: "Blood Pressure", count: 42 },
  { name: "First Aid Kits", count: 18 },
  { name: "Monitoring Devices", count: 36 },
  { name: "Thermometers", count: 15 },
];

const ratingFilters = [
  { stars: 5, label: "5 & Up" },
  { stars: 4, label: "4 & Up" },
  { stars: 3, label: "3 & Up" },
];

export default function ProductsPage() {
  return (
    <div className="bg-[var(--background)] text-slate-900">
      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-6 pt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span>Home</span>
          <i className="uil uil-angle-right text-sm" />
          <span className="text-slate-600">Shop All Products</span>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block">
            <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <i className="uil uil-filter text-violet-600" />
                Categories
              </div>
              <div className="mt-4 space-y-3">
                {categories.map((category) => (
                  <label
                    key={category.name}
                    className="flex items-center justify-between gap-3 text-sm text-slate-600"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-violet-200 text-violet-600 focus:ring-violet-200"
                        defaultChecked={category.active}
                      />
                      {category.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {category.count}
                    </span>
                  </label>
                ))}
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
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      defaultValue="0"
                      className="w-full rounded-xl border border-violet-100 px-3 py-2 text-xs text-slate-600"
                    />
                    <input
                      type="text"
                      defaultValue="2000"
                      className="w-full rounded-xl border border-violet-100 px-3 py-2 text-xs text-slate-600"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-violet-100 pt-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <i className="uil uil-star text-violet-600" />
                  Rating
                </div>
                <div className="mt-4 space-y-3">
                  {ratingFilters.map((rating) => (
                    <label
                      key={rating.label}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <input
                        type="radio"
                        name="rating"
                        className="h-4 w-4 border-violet-200 text-violet-600 focus:ring-violet-200"
                      />
                      <span className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: rating.stars }).map((_, idx) => (
                          <i key={idx} className="uil uil-star" />
                        ))}
                      </span>
                      <span className="text-xs text-slate-400">
                        {rating.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Shop All Products
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Showing 1-9 of 124 results
                </p>
              </div>
              <label className="flex items-center gap-3 text-sm text-slate-500">
                Sort by:
                <select className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-violet-300 focus:outline-none">
                  <option>Popularity</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </label>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.slug}
                  className="relative flex h-full flex-col rounded-3xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View ${product.name}`}
                    className="absolute inset-0 z-10 rounded-3xl"
                  />
                  {product.badge ? (
                    <span className="absolute left-5 top-5 rounded-full bg-rose-500 px-2 py-1 text-[10px] font-semibold uppercase text-white">
                      {product.badge}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    aria-label="Save product"
                    className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-violet-100 text-slate-400 transition hover:text-violet-600"
                  >
                    <i className="uil uil-heart" />
                  </button>
                  <div className="flex h-44 items-center justify-center rounded-2xl bg-violet-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="h-28 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-amber-400">
                      <i className="uil uil-star" />
                      <span className="font-semibold text-slate-700">
                        {product.rating}
                      </span>
                      <span className="text-slate-400">
                        ({product.reviews})
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
                    <AddToCartButton
                      product={product}
                      iconOnly
                      className="relative z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm transition hover:bg-violet-500"
                    />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-2">
              {["<", "1", "2", "3", "...", "12", ">"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-semibold ${
                    item === "1"
                      ? "border-violet-200 bg-violet-600 text-white"
                      : "border-violet-100 bg-white text-slate-500 hover:border-violet-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
