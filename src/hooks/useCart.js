import { useEffect, useState } from "react";

const CART_KEY = "volt-cart";

function readCart() {
  const saved = window.localStorage.getItem(CART_KEY);
  if (!saved) return [];

  const cart = JSON.parse(saved);
  return Array.isArray(cart) ? cart : [];
}

export default function useCart() {
  const [cart, setCart] = useState(readCart);
  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);
  return [cart, setCart];
}
