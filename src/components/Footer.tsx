"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname() || "/";
  const isAuthPage = ["/signin", "/signup", "/verify"].some((p) =>
    pathname.startsWith(p)
  );
  if (isAuthPage) return null;

  return (
    <footer className="border-t border-violet-100/70 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
                <i className="uil uil-heart text-lg" />
              </span>
              <span className="text-lg font-semibold text-slate-900">
                HealthPulse
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Empowering you with the knowledge and tools for a healthier
              tomorrow.
            </p>
            <div className="flex items-center gap-3 text-slate-500">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-100 transition hover:border-violet-300 hover:text-violet-600"
                aria-label="Twitter"
              >
                <i className="uil uil-twitter" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-100 transition hover:border-violet-300 hover:text-violet-600"
                aria-label="Instagram"
              >
                <i className="uil uil-instagram" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-100 transition hover:border-violet-300 hover:text-violet-600"
                aria-label="YouTube"
              >
                <i className="uil uil-youtube" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Quick Links</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <Link href="/" className="hover:text-violet-600">
                Home
              </Link>
              <Link href="/products" className="hover:text-violet-600">
                Shop All Products
              </Link>
              <Link href="/blog" className="hover:text-violet-600">
                Health Blog
              </Link>
              <Link href="/contact" className="hover:text-violet-600">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Support</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <Link href="/help" className="hover:text-violet-600">
                Help Center
              </Link>
              <Link href="/returns" className="hover:text-violet-600">
                Returns & Refunds
              </Link>
              <Link href="/shipping" className="hover:text-violet-600">
                Shipping Info
              </Link>
              <Link href="/privacy" className="hover:text-violet-600">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Contact Us</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <i className="uil uil-location-point text-violet-500" />
                123 Wellness Way, Suite 400
              </span>
              <span className="flex items-center gap-2">
                <i className="uil uil-phone text-violet-500" />
                +1 (555) 123-4567
              </span>
              <span className="flex items-center gap-2">
                <i className="uil uil-envelope text-violet-500" />
                support@healthpulse.com
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-violet-100 pt-6 text-xs text-slate-400 md:flex-row">
          <span>© 2026 HealthPulse. All rights reserved.</span>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="font-semibold text-slate-400">VISA</span>
            <span className="font-semibold text-slate-400">MC</span>
            <span className="font-semibold text-slate-400">AMEX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
