import { createContext, useEffect, useState } from "react";

const CART_KEY = "volt-cart";

export const CartContext = createContext(null);

function readCart() {
  const saved = window.localStorage.getItem(CART_KEY);
  if (!saved) return [];

  const savedCart = JSON.parse(saved);
  if (!Array.isArray(savedCart)) return [];

  return savedCart
    .filter(
      (item) =>
        typeof item === "number" ||
        (item && typeof item === "object" && typeof item.productId === "number"),
    )
    .map((item) =>
      typeof item === "number"
        ? { productId: item, quantity: 1 }
        : {
            ...item,
            quantity:
              Number.isInteger(item.quantity) && item.quantity > 0
                ? item.quantity
                : 1,
          },
    );
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}
