"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/types/product";

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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load AFTER hydration
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Persist whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (quantity <= 0) return;

    setItems((current) => {
      const existing = current.find(
        (item) => item.product.slug === product.slug
      );

      if (existing) {
        return current.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) =>
      current.filter((item) => item.product.slug !== slug)
    );
  }, []);

  const updateQty = useCallback(
    (slug: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(slug);
        return;
      }

      setItems((current) =>
        current.map((item) =>
          item.product.slug === slug ? { ...item, quantity } : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalQty = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalQty,
      subtotal,
      addItem,
      removeItem,
      updateQty,
      clearCart,
    }),
    [items, totalQty, subtotal, addItem, removeItem, updateQty, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
