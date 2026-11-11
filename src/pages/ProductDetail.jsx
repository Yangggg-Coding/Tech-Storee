import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import useProducts from "../hooks/useProducts";
export default function ProductDetail() {
  const { products, loading, error } = useProducts();
  if (loading)
    return (
      <section className="bestsellers bestsellers--status">
        Loading bestsellers…
      </section>
    );
  if (error)
    return (
      <section className="bestsellers bestsellers--status" role="alert">
        We couldn’t load bestsellers: {error}
      </section>
    );

  if (products.length === 0) {
    return <p className="shop--empty">No products are available right now.</p>;
  }
  products.forEach((product) => {
    if (products.id === product.id) {
      console.log(product.name);
    }
  });
  return (
    <>
      <Layout />
      <p>Product detail page</p>
      <Footer />
    </>
  );
}
