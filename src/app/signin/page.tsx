"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);
        try {
            const result = await login(email, password);
            if (result.requiresVerification) {
                router.push(
                    `/verify?email=${encodeURIComponent(result.email || email)}`
                );
            } else {
                // Check if there's a redirect URL
                const params = new URLSearchParams(window.location.search);
                const redirect = params.get("redirect") || "/";
                router.push(redirect);
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Login failed.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Panel */}
            <div className="relative hidden w-[480px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-900 p-10 text-white lg:flex">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
                        <i className="uil uil-heart-medical text-lg text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">HealthPulse</span>
                </div>

                <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -top-20 right-10 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

                <div className="z-10">
                    <h2 className="text-[2.5rem] font-bold leading-tight">
                        Welcome back to
                        <br />
                        HealthPulse.
                    </h2>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-violet-200">
                        Access your health dashboard, track orders, and explore premium
                        health equipment.
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-violet-700 bg-violet-400/40 text-[10px] font-bold text-white"
                                >
                                    {["AK", "JD", "SR"][i]}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="uil uil-star text-xs" />
                                ))}
                            </div>
                            <span className="text-xs text-violet-200">
                                Trusted by 10k+ users
                            </span>
                        </div>
                    </div>
                </div>

                <div className="z-10 flex items-center gap-6 text-[11px] text-violet-300">
                    <span>© 2023 HealthPulse. All rights reserved.</span>
                    <a href="#" className="hover:text-white">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-white">
                        Terms of Service
                    </a>
                </div>
            </div>

            {/* Right Panel — Form */}
            <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 lg:px-16">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                        <i className="uil uil-lock-alt text-2xl text-violet-600" />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-violet-600 hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>

                    {error && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email Address
                            </label>
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
                                <i className="uil uil-envelope text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-xs font-medium text-violet-600 hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
                                <i className="uil uil-lock text-slate-400" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:from-violet-500 hover:to-purple-500 disabled:opacity-60"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-xs text-slate-400">Or continue with</span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        {/* Social */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                            >
                                <i className="uil uil-facebook-f text-lg text-blue-600" />
                                Facebook
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
