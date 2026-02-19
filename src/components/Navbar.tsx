"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  { href: "/blog", label: "Blog", match: (path: string) => path.startsWith("/blog") },
  { href: "/products", label: "Products", match: (path: string) => path.startsWith("/products") },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const { totalQty } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Hide navbar on auth pages
  const isAuthPage = ["/signin", "/signup", "/verify"].some((p) =>
    pathname.startsWith(p)
  );
  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-violet-100/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
            <i className="uil uil-heart text-lg" />
          </span>
          <span className="text-lg font-semibold text-slate-900">
            HealthPulse
          </span>
        </Link>

        <div className="hidden flex-1 md:flex">
          <label className="relative w-full max-w-xl">
            <i className="uil uil-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search articles, products..."
              className="w-full rounded-full border border-violet-100 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 shadow-sm transition focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </label>
        </div>

        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {navItems.map((item) => {
            const isActive = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "font-semibold text-violet-600"
                    : "text-slate-500 transition hover:text-slate-900"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            href="/cart"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-violet-100 text-slate-600 transition hover:border-violet-300 hover:text-violet-600 md:flex"
            aria-label="Shopping cart"
          >
            <i className="uil uil-shopping-cart text-lg" />
            {totalQty > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-semibold text-white">
                {totalQty}
              </span>
            ) : null}
          </Link>

          {/* User / Auth Button */}
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="hidden h-10 items-center gap-2 rounded-full border border-violet-100 px-3 text-sm text-slate-600 transition hover:border-violet-300 hover:text-violet-600 md:flex"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                  {user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <span className="max-w-[100px] truncate font-medium">
                  {user.fullName.split(" ")[0]}
                </span>
                <i className="uil uil-angle-down text-xs" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-12 w-48 rounded-xl border border-slate-100 bg-white py-2 shadow-lg">
                  <div className="border-b border-slate-100 px-4 py-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {user.fullName}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-50"
                  >
                    <i className="uil uil-signout" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="hidden h-10 items-center gap-2 rounded-full border border-violet-100 px-4 text-sm font-medium text-slate-600 transition hover:border-violet-300 hover:text-violet-600 md:flex"
            >
              <i className="uil uil-user text-lg" />
              Sign In
            </Link>
          )}

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-100 text-slate-600 transition hover:border-violet-300 hover:text-violet-600 md:hidden"
            aria-label="Open menu"
          >
            <i className="uil uil-bars text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}

