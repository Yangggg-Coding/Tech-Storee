import Layout from "../components/layout/Layout";
import ProductCard from "../components/product/ProductCard";
import Footer from "../components/layout/Footer";
import useProducts from "../hooks/useProducts";
import ProductGrid from "../components/product/ProductGrid";
import { useSearchParams } from "react-router-dom";
import sortProducts from "../utils/sortProducts";
import filterProducts from "../utils/filterProducts";



export default function Shop() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "featured";
  const category = searchParams.get("category");
  const query = searchParams.get("q") || "";

  const visible = sortProducts(filterProducts(products, category, query), sort);

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
            <ProductCard />
            <ProductGrid products={visible} query={query} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
