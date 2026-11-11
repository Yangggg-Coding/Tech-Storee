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
          <p className="reco__eyebrow">Chosen with care</p>
          <h2 className="reco__title">Recommended for you</h2>
        </div>
        <Link to="/shop" className="reco__link">
          View Full Catalog <ArrowRight size={16} />
        </Link>
      </div>

      <div className="reco__grid">
        {picks.map((p) => (
          <article key={p.id} className="reco__card">
            <div className="reco__media">
              <Link to={`/productdetail/${p.id}`}>
                <img src={p.image} alt={p.name} />
              </Link>

              {p.badge && <span className="reco__badge">{p.badge}</span>}

              <div className="reco__actions">
                <button
                  className={
                    wishlist.includes(p.id)
                      ? "reco__icon reco__icon--active"
                      : "reco__icon"
                  }
                  onClick={() => toggleWishlist(p.id)}
                  aria-label={wishlist.includes(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={wishlist.includes(p.id)}
                >
                  <Heart
                    size={16}
                    fill={wishlist.includes(p.id) ? "currentColor" : "none"}
                  />
                </button>
                <Link
                  to={`/productdetail/${p.id}`}
                  className="reco__icon"
                  aria-label="Quick view"
                >
                  <Eye size={16} />
                </Link>
              </div>
            </div>

            <div className="reco__body">
              <div className="reco__meta">
                <span className="reco__category">
                  {categoryLabels[p.category] || p.category}
                </span>
                <span className="reco__rating">
                  <Star size={13} fill="currentColor" />
                  {p.rating}
                </span>
              </div>

              <h3 className="reco__name">
                <Link to={`/productdetail/${p.id}`}>{p.name}</Link>
              </h3>

              <div className="reco__foot">
                <div className="reco__prices">
                  <span className="reco__price">${p.price.toFixed(2)}</span>
                  {p.originalPrice && (
                    <span className="reco__old">
                      ${p.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Link className="reco__cart" to={`/productdetail/${p.id}`} aria-label={`View ${p.name}`}>
                  <ShoppingCart size={18} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}