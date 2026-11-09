import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Heart, ShoppingCart, Star } from "lucide-react";
import useProducts from "../../hooks/useProducts";

const categoryLabels = {
  phones: "Phones & tablets",
  audio: "Audio",
  laptops: "Computers",
  gaming: "Gaming",
  accessories: "Accessories",
};

export default function Recommended() {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const picks = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  function toggleWishlist(id) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <section className="reco">
      <div className="reco__head">
        <div>
          <p className="reco__eyebrow">Personalized engine</p>
          <h2 className="reco__title">Recommended For You</h2>
        </div>
        <Link to="/shop" className="reco__link">
          View Full Catalog <ArrowRight size={16} />
        </Link>
      </div>

      <div className="reco__grid">
        {picks.map((p) => (
          <article key={p.id} className="reco-card">
            <div className="reco-card__media">
              <Link to={`/product/${p.id}`}>
                <img src={p.image} alt={p.name} />
              </Link>

              {p.badge && <span className="reco-card__badge">{p.badge}</span>}

              <div className="reco-card__actions">
                <button
                  className={
                    wishlist.includes(p.id)
                      ? "reco-card__icon reco-card__icon--active"
                      : "reco-card__icon"
                  }
                  onClick={() => toggleWishlist(p.id)}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={16}
                    fill={wishlist.includes(p.id) ? "currentColor" : "none"}
                  />
                </button>
                <Link
                  to={`/product/${p.id}`}
                  className="reco-card__icon"
                  aria-label="Quick view"
                >
                  <Eye size={16} />
                </Link>
              </div>
            </div>

            <div className="reco-card__body">
              <div className="reco-card__meta">
                <span className="reco-card__category">
                  {categoryLabels[p.category] || p.category}
                </span>
                <span className="reco-card__rating">
                  <Star size={13} fill="currentColor" />
                  {p.rating}
                </span>
              </div>

              <h3 className="reco-card__name">
                <Link to={`/product/${p.id}`}>{p.name}</Link>
              </h3>

              <div className="reco-card__foot">
                <div className="reco-card__prices">
                  <span className="reco-card__price">${p.price.toFixed(2)}</span>
                  {p.originalPrice && (
                    <span className="reco-card__old">
                      ${p.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <button className="reco-card__cart" aria-label="Add to cart">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}