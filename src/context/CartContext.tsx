"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalQty: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "menshealth_cart";

const parsePrice = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
};

const loadFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore storage errors
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadFromStorage());

  const setAndPersist = useCallback((updater: (current: CartItem[]) => CartItem[]) => {
    setItems((current) => {
      const nextItems = updater(current);
      saveToStorage(nextItems);
      return nextItems;
    });
  }, []);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      if (quantity <= 0) return;
      setAndPersist((current) => {
        const existing = current.find((item) => item.product.slug === product.slug);
        if (existing) {
          return current.map((item) =>
            item.product.slug === product.slug
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...current, { product, quantity }];
      });
    },
    [setAndPersist]
  );

  const removeItem = useCallback(
    (slug: string) => {
      setAndPersist((current) =>
        current.filter((item) => item.product.slug !== slug)
      );
    },
    [setAndPersist]
  );

  const updateQty = useCallback(
    (slug: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(slug);
        return;
      }
      setAndPersist((current) =>
        current.map((item) =>
          item.product.slug === slug ? { ...item, quantity } : item
        )
      );
    },
    [setAndPersist, removeItem]
  );

  const clearCart = useCallback(() => setAndPersist(() => []), [setAndPersist]);

  const totalQty = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + parsePrice(item.product.price) * item.quantity,
        0
      ),
    [items]
  );

  const value = useMemo(
    () => ({ items, totalQty, subtotal, addItem, removeItem, updateQty, clearCart }),
    [items, totalQty, subtotal, addItem, removeItem, updateQty, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
