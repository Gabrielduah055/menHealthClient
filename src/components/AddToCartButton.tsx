"use client";

import type { MouseEvent } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  className?: string;
  label?: string;
  iconOnly?: boolean;
};

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  label = "Add to Cart",
  iconOnly = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(product, quantity);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={iconOnly ? "Add to cart" : undefined}
    >
      <i className="uil uil-shopping-bag" />
      {!iconOnly ? <span>{label}</span> : null}
    </button>
  );
}
