"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";

const formatMoney = (value: number | string) =>
    `GHS ${Number(value).toFixed(2)}`;

export default function CheckoutPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();
    const { items, subtotal, clearCart } = useCart();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const shipping = subtotal > 0 ? 45 : 0;
    const tax = subtotal * 0.0164;
    const total = subtotal + shipping + tax;

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/signin?redirect=/checkout");
        }
    }, [isLoading, isAuthenticated, router]);

    // Pre-fill user data
    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!fullName || !email || !phone || !address) {
            setError("Please fill in all required fields.");
            return;
        }

        if (items.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        setSubmitting(true);
        try {
            await api.post("/api/orders", {
                customer: {
                    name: fullName,
                    email,
                    phone,
                    address,
                },
                items: items.map((item) => ({
                    productId: item.product._id,
                    nameSnapshot: item.product.name,
                    priceSnapshot: Number(item.product.price),
                    qty: item.quantity,
                    lineTotal: Number(item.product.price) * item.quantity,
                })),
                totalAmount: total,
                deliveryNotes,
            });

            clearCart();
            setOrderSuccess(true);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Order submission failed.";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <i className="uil uil-check-circle text-4xl text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Order Placed!</h1>
                <p className="mt-3 max-w-sm text-sm text-slate-500">
                    Thank you for your order. We&apos;ll send a confirmation email to{" "}
                    <strong>{email}</strong> shortly.
                </p>
                <Link
                    href="/products"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-violet-500"
                >
                    Continue Shopping
                    <i className="uil uil-arrow-right" />
                </Link>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
            </div>
        );
    }

    return (
        <div className="bg-[var(--background)] text-slate-900">
            <div className="mx-auto w-full max-w-6xl px-6 pb-6 pt-8">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <Link href="/" className="transition hover:text-slate-600">
                        Home
                    </Link>
                    <i className="uil uil-angle-right text-sm" />
                    <Link href="/cart" className="transition hover:text-slate-600">
                        Cart
                    </Link>
                    <i className="uil uil-angle-right text-sm" />
                    <span className="text-slate-600">Checkout</span>
                </div>
            </div>

            <div className="mx-auto w-full max-w-6xl px-6 pb-16">
                <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>

                {error && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]"
                >
                    {/* Left — Shipping Details */}
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                Shipping Information
                            </h2>

                            <div className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                        placeholder="+233 (0) 000 0000"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Shipping Address *
                                    </label>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows={3}
                                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Street address, city, region..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Delivery Instructions (optional)
                                    </label>
                                    <textarea
                                        value={deliveryNotes}
                                        onChange={(e) => setDeliveryNotes(e.target.value)}
                                        rows={2}
                                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Any special delivery instructions..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">
                                Order Items ({items.length})
                            </h2>
                            <div className="divide-y divide-violet-100">
                                {items.map((item) => (
                                    <div
                                        key={item.product.slug}
                                        className="flex items-center gap-4 py-4"
                                    >
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                                            {item.product.images?.[0] ? (
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    width={40}
                                                    height={40}
                                                    className="h-10 w-auto object-contain"
                                                />
                                            ) : (
                                                <i className="uil uil-box text-lg text-violet-300" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {item.product.name}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="text-sm font-semibold text-violet-600">
                                            {formatMoney(
                                                Number(item.product.price) * item.quantity
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — Order Summary */}
                    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm h-fit sticky top-24">
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
                                <span>Shipping</span>
                                <span>{formatMoney(shipping)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Tax</span>
                                <span>{formatMoney(tax)}</span>
                            </div>
                            <div className="border-t border-violet-100 pt-4">
                                <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                                    <span>Total</span>
                                    <span className="text-violet-600">
                                        {formatMoney(total)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || items.length === 0}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-500 disabled:opacity-60"
                        >
                            {submitting ? "Placing Order..." : "Place Order"}
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
                </form>
            </div>
        </div>
    );
}
