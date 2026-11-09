import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import BenefitsBar from "./BenefitsBar";
import FlashDeal from "./FlashDeals";

export default function Hero() {
  const { products, loading, error } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (products.length < 2) return undefined;

    const intervalId = setInterval(() => {
      setActiveIndex((index) => (index + 1) % products.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [products.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const featuredProduct = products[activeIndex];

  if (!featuredProduct) return null;

  return (
    <>
      <section>
        <div>
          <h1>{featuredProduct?.name}</h1>
          <p>{featuredProduct?.description}</p>
          <button>Explore</button>
        </div>
        <img src={featuredProduct.image} alt={featuredProduct.name} />
      </section>
      <section>
        <BenefitsBar />
      </section>
      <section>
        <FlashDeal />
      </section>
    </>
  );
}
