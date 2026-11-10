import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  if (loading) {
    return (
      <section className="hero hero--status" aria-live="polite">
        Loading featured phones…
      </section>
    );
  }

  if (error) {
    return (
      <section className="hero hero--status" role="alert">
        We couldn’t load products: {error}
      </section>
    );
  }

  const featuredProduct = products[activeIndex];
  if (!featuredProduct) return null;

  return (
    <div className="home-hero">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">The latest, picked for you</p>
          <h1 className="hero__title">
            Meet your next <span>favorite phone.</span>
          </h1>
          <p className="hero__description">{featuredProduct.description}</p>
          <div className="hero__actions">
            <Link
              className="button button--primary"
              to={`/product/${featuredProduct.id}`}
            >
              Shop {featuredProduct.name}
            </Link>
            <Link className="button button--secondary" to="/shop">
              Explore all phones
            </Link>
          </div>
        </div>
        <Link
          className="hero__image-wrap"
          to={`/product/${featuredProduct.id}`}
          aria-label={`View ${featuredProduct.name}`}
        >
          <img
            className="hero__image"
            src={featuredProduct.image}
            alt={featuredProduct.name}
          />
          <span className="hero__image-badge">
            {featuredProduct.badge || "Volt pick"}
          </span>
        </Link>
      </section>
      <BenefitsBar />
      <FlashDeal />
    </div>
  );
}
