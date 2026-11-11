import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShoppingCart, Star } from "lucide-react";
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <section className="reco">
      <div className="reco_head">
        <div>
          <p className="reco_eyebrow">Chosen with care</p>
          <h2 className="reco_title">Recommended for you</h2>
        </div>
        <Link to="/shop" className="reco_link">
          View Full Catalog <ArrowRight size={16} />
        </Link>
      </div>

      <div className="reco_grid">
        {picks.map((p) => (
          <article key={p.id} className="reco_card">
            <div className="reco_media">
              <Link to={`/productdetail/${p.id}`}>
                <img src={p.image} alt={p.name} />
              </Link>

              {p.badge && <span className="reco_badge">{p.badge}</span>}

              <div className="reco_actions">
                <button
                  className={
                    wishlist.includes(p.id)
                      ? "reco_icon reco_icon--active"
                      : "reco_icon"
                  }
                  onClick={() => toggleWishlist(p.id)}
                  aria-label={
                    wishlist.includes(p.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  aria-pressed={wishlist.includes(p.id)}
                >
                  <Heart
                    size={16}
                    fill={wishlist.includes(p.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>

            <div className="reco_body">
              <div className="reco_meta">
                <span className="reco_category">
                  {categoryLabels[p.category] || p.category}
                </span>
                <span className="reco_rating">
                  <Star size={13} fill="currentColor" />
                  {p.rating}
                </span>
              </div>

              <h3 className="reco_name">
                <Link to={`/productdetail/${p.id}`}>{p.name}</Link>
              </h3>

              <div className="reco_foot">
                <div className="reco_prices">
                  <span className="reco_price">${p.price.toFixed(2)}</span>
                  {p.originalPrice && (
                    <span className="reco_old">
                      ${p.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Link
                  className="reco_cart"
                  to={`/productdetail/${p.id}`}
                  aria-label={`View ${p.name}`}
                >
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
