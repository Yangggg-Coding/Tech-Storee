import { Clock3 } from "lucide-react";
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
      <div className="deal_content">
        <div className="deal_copy">
          <p className="deal_eyebrow">Deal of the week</p>
          <h2 className="deal_title">
            A little more phone
            <br />A lot less price.
          </h2>
          <p className="deal_description">
            Thoughtful tech, special pricing, and the same Volt support you can
            count on.
          </p>
          <div className="deal_timer">
            <Clock3 size={17} aria-hidden="true" /> Limited-time offer
          </div>
          <Link
            className="button button--primary"
            to={`/productdetail/${deal.id}`}
          >
            Shop the deal
          </Link>
        </div>
        <Link
          className="deal_product"
          to={`/productdetail/${deal.id}`}
          aria-label={`Shop ${deal.name}`}
        >
          <span className="deal_badge">Special price</span>
          <img src={deal.image} alt={deal.name} />
          <span className="deal_product-name">{deal.name}</span>
          <span className="deal_price">
            ${deal.price.toFixed(2)}{" "}
            {deal.originalPrice && (
              <del className="deal_old-price">
                ${deal.originalPrice.toFixed(2)}
              </del>
            )}
          </span>
        </Link>
      </div>
    </section>
  );
}
