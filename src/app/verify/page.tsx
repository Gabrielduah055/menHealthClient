"use client";

import React, { Suspense, useState, useRef, KeyboardEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, authTokenKey } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { AuthUser } from "@/context/AuthContext";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setUser } = useAuth();
    const email = searchParams.get("email") || "";

    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) {
            router.push("/signup");
        }
    }, [email, router]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only digits

        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only last digit
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const newCode = [...code];
        for (let i = 0; i < 6; i++) {
            newCode[i] = pasted[i] || "";
        }
        setCode(newCode);
        const focusIdx = Math.min(pasted.length, 5);
        inputRefs.current[focusIdx]?.focus();
    };

    const handleVerify = async () => {
        const fullCode = code.join("");
        if (fullCode.length !== 6) {
            setError("Please enter the full 6-digit code.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            const response = await api.post<{
                token: string;
                user: AuthUser;
                message: string;
            }>("/api/auth/verify-email", { email, code: fullCode });

            localStorage.setItem(authTokenKey, response.token);
            setUser(response.user);
            router.push("/");
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Verification failed.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setResendSuccess(false);
        setError("");
        try {
            await api.post("/api/auth/resend-code", { email });
            setResendSuccess(true);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Failed to resend code.";
            setError(message);
        } finally {
            setResending(false);
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
                        Secure access to
                        <br />
                        your health
                        <br />
                        dashboard.
                    </h2>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-violet-200">
                        Protecting your personal health data with advanced security
                        verification.
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

            {/* Right Panel — Verification */}
            <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 lg:px-16">
                <div className="w-full max-w-md text-center">
                    {/* Shield Icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
                        <i className="uil uil-shield-check text-3xl text-violet-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900">
                        Enter Verification Code
                    </h1>
                    <p className="mt-2 text-sm text-violet-500">
                        We&apos;ve sent a 6-digit code to
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{email}</p>

                    {error && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {resendSuccess && (
                        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
                            Verification code resent! Check your email.
                        </div>
                    )}

                    {/* Code Inputs */}
                    <div
                        className="mt-8 flex justify-center gap-3"
                        onPaste={handlePaste}
                    >
                        {code.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => {
                                    inputRefs.current[i] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className="h-14 w-12 rounded-xl border-2 border-slate-200 text-center text-xl font-bold text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        type="button"
                        onClick={handleVerify}
                        disabled={loading}
                        className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:from-violet-500 hover:to-purple-500 disabled:opacity-60"
                    >
                        {loading ? "Verifying..." : "Sign In"}
                    </button>

                    {/* Resend */}
                    <p className="mt-5 text-sm text-slate-500">
                        Didn&apos;t receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="font-semibold text-violet-600 hover:underline disabled:opacity-60"
                        >
                            {resending ? "Resending..." : "Resend Code"}
                        </button>
                    </p>

                    {/* Go Back */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mt-4 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-700"
                    >
                        <i className="uil uil-arrow-left" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center" />}>
            <VerifyContent />
        </Suspense>
    );
}
