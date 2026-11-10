import {  Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

export default function FlashDeal() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <section className="deal" aria-live="polite">
        Loading this week’s deal…
      </section>
    );
  }

  if (error) {
    return (
      <section className="deal" role="alert">
        We couldn’t load this week’s deal: {error}
      </section>
    );
  }

  const deal = products.find((product) => product.originalPrice) || products[0];
  if (!deal) return null;

  return (
    <section className="deal">
      <div className="deal__content">
        <div className="deal__copy">
          <p className="deal__eyebrow">Deal of the week</p>
          <h2 className="deal__title">
            A little more phone. A lot less price.
          </h2>
          <p className="deal__description">
            Thoughtful tech, special pricing, and the same Volt support you can
            count on.
          </p>
          <div className="deal__timer">
            <Clock3 size={17} aria-hidden="true" /> Limited-time offer
          </div>
          <Link className="button button--primary" to={`/product/${deal.id}`}>
            Shop the deal
          </Link>
        </div>
        <Link
          className="deal__product"
          to={`/product/${deal.id}`}
          aria-label={`Shop ${deal.name}`}
        >
          <span className="deal__badge">Special price</span>
          <img src={deal.image} alt={deal.name} />
          <span className="deal__product-name">{deal.name}</span>
          <span className="deal__price">
            ${deal.price.toFixed(2)}{" "}
            {deal.originalPrice && (
              <del className="deal__old-price">
                ${deal.originalPrice.toFixed(2)}
              </del>
            )}
          </span>
        </Link>
      </div>
    </section>
  );
}
