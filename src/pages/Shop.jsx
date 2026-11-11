import Layout from "../components/layout/Layout";
import ProductCard from "../components/product/ProductCard";
import Footer from "../components/layout/Footer";
import useProducts from "../hooks/useProducts";
import ProductGrid from "../components/product/ProductGrid";
import { useSearchParams } from "react-router-dom";
import { sortProducts } from "../utils/sortProducts";

export default function Shop() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "featured";

  function handleSort(value) {
    const next = new URLSearchParams(searchParams);
    if (value === "featured") {
      next.delete("sort");
    } else {
      next.set("sort", value);
    }
    setSearchParams(next);
  }

  const sortedProducts = sortProducts(products, sort);
  
  return (
    <>
      <Layout />
      <main className="shop-page">
        {loading ? (
          <p className="shop--status">Loading products…</p>
        ) : error ? (
          <p className="shop--status" role="alert">
            We couldn’t load products: {error}
          </p>
        ) : (
          <>
            <ProductCard
              count={sortedProducts.length}
              sort={sort}
              onSortChange={handleSort}
            />
            <ProductGrid products={sortedProducts} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
