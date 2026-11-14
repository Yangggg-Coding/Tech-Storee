import { useEffect, useState } from "react";

const WISHLIST_KEY = "volt-wishlist";

function readWishlist() {
  const saved = window.localStorage.getItem(WISHLIST_KEY);
  if (!saved) return [];

  const wishlist = JSON.parse(saved);
  return Array.isArray(wishlist) ? wishlist : [];
}

export default function useWishlist() {
  const [wishlist, setWishlist] = useState(readWishlist);

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  return [wishlist, setWishlist];
}
