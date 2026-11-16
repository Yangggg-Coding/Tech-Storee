import Layout from "../components/layout/Layout";
import ProductCard from "../components/product/ProductCard";
import Footer from "../components/layout/Footer";
import useProducts from "../hooks/useProducts";
import ProductGrid from "../components/product/ProductGrid";
import { useSearchParams } from "react-router-dom";
import sortProducts from "../utils/sortProducts";
import filterProducts from "../utils/filterProducts";

const headings = {
  all: {
    title: "Shop all tech",
    text: "Phones, computers, audio, and more.",
  },
  phones: {
    title: "Phones & tablets",
    text: "Flagship power and cameras that keep up.",
  },
  computers: {
    title: "Computers",
    text: "Laptops for work, school, and play.",
  },
  audio: {
    title: "Audio",
    text: "Headphones and earbuds for focus and music.",
  },
  gaming: {
    title: "Gaming",
    text: "Consoles and handhelds for every player.",
  },
  "smart-home": {
    title: "Smart home",
    text: "Speakers, lights, and thermostats.",
  },
  accessories: {
    title: "Accessories",
    text: "Chargers, storage, and desk gear.",
  },
};

export default function Shop() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "featured";
  const category = searchParams.get("category");
  const query = searchParams.get("q") || "";

  const visible = sortProducts(filterProducts(products, category, query), sort);
  const heading = query
    ? {
        title: `Results for "${query}"`,
        text: "Try a brand, a model, or a category.",
      }
    : headings[category] || headings.all;

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
