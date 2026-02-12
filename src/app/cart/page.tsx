"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/context/CartContext";

const formatMoney = (value: number) => `GHS ${value.toFixed(2)}`;

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, totalQty } = useCart();

  const shipping = subtotal > 0 ? 45 : 0;
  const tax = subtotal * 0.0164;
  const discount = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping + tax - discount;

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
          <span className="text-slate-600">Shopping Cart</span>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Your Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {totalQty} item{totalQty === 1 ? "" : "s"} in your cart
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-violet-600"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-[1.2fr_0.5fr_0.4fr_0.4fr] gap-4 border-b border-violet-100 pb-4 text-xs font-semibold uppercase text-slate-400">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Price</span>
              <span className="text-right">Total</span>
            </div>

            {items.length === 0 ? (
              <div className="py-10 text-center text-sm text-slate-500">
                Your cart is empty. Start adding products to see them here.
              </div>
            ) : (
              <div className="divide-y divide-violet-100">
                {items.map((item) => {
                  const lineTotal = item.quantity * Number(item.product.price.replace(/[^0-9.]/g, ""));
                  return (
                    <div
                      key={item.product.slug}
                      className="grid grid-cols-[1.2fr_0.5fr_0.4fr_0.4fr] items-center gap-4 py-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.product.description}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.slug)}
                            className="mt-2 inline-flex items-center gap-2 text-xs text-red-500"
                          >
                            <i className="uil uil-trash" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-3 rounded-full border border-violet-100 px-3 py-2 text-sm">
                          <button
                            type="button"
                            className="text-slate-400 transition hover:text-violet-600"
                            onClick={() =>
                              updateQty(item.product.slug, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <i className="uil uil-minus" />
                          </button>
                          <span className="min-w-[20px] text-center text-sm text-slate-700">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="text-slate-400 transition hover:text-violet-600"
                            onClick={() =>
                              updateQty(item.product.slug, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <i className="uil uil-plus" />
                          </button>
                        </div>
                      </div>

                      <span className="text-center text-sm text-slate-600">
                        {item.product.price}
                      </span>
                      <span className="text-right text-sm font-semibold text-violet-600">
                        {formatMoney(lineTotal)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Order Summary
            </h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Shipping</span>
                <span>{formatMoney(shipping)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>{formatMoney(tax)}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-600">
                <span>Discount (Pro Member)</span>
                <span>- {formatMoney(discount)}</span>
              </div>
              <div className="border-t border-violet-100 pt-4">
                <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                  <span>Total</span>
                  <span className="text-violet-600">{formatMoney(total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Promo Code
              </p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full rounded-full border border-violet-100 px-4 py-2 text-sm text-slate-600"
                />
                <button
                  type="button"
                  className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-slate-600"
                >
                  Apply
                </button>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-500"
            >
              Proceed to Checkout
              <i className="uil uil-arrow-right" />
            </button>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-xs text-slate-600">
                <i className="uil uil-lock text-emerald-500" />
                Secure Encrypted Payment
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-xs text-slate-600">
                <i className="uil uil-shield-check text-blue-500" />
                30-Day Easy Returns
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
