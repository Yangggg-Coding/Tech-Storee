import { ArrowRight, ShoppingBag, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useWishlist from "../../hooks/useWishlist";

export default function Bestsellers() {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useWishlist();
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

  function toggleWishlist(id) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const bests = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  if (bests.length === 0) return null;

  return (
    <section className="bestsellers">
      <div className="bestsellers_header">
        <div>
          <p className="bestsellers_eyebrow">Popular picks</p>
          <h2 className="bestsellers_title">Customer favorites</h2>
        </div>
        <Link className="bestsellers_link" to="/shop">
          Shop All <ArrowRight size={17} />
        </Link>
      </div>
      <div className="bestsellers_grid">
        {bests.map((product) => (
          <article className="bestsellers_card" key={product.id}>
            <div className="bestsellers_image-wrap">
              <Link to={`/productdetail/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              {product.badge && (
                <span className="bestsellers_badge">{product.badge}</span>
              )}
              <div className="reco_actions">
                <button
                  className={
                    wishlist.includes(product.id)
                      ? "reco_icon reco_icon--active"
                      : "reco_icon"
                  }
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={
                    wishlist.includes(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  aria-pressed={wishlist.includes(product.id)}
                >
                  <Heart
                    size={16}
                    fill={
                      wishlist.includes(product.id) ? "currentColor" : "none"
                    }
                  />
                </button>
              </div>
            </div>
            <div className="bestsellers_body">
              <div className="bestsellers_meta">
                <span>{product.brand}</span>
                <span className="bestsellers_rating">
                  <Star size={15} fill="currentColor" /> {product.rating}
                </span>
              </div>
              <h3>
                <Link to={`/productdetail/${product.id}`}>{product.name}</Link>
              </h3>
              <div className="bestsellers_footer">
                <div>
                  <strong>${product.price.toFixed(2)}</strong>
                  {product.originalPrice && (
                    <del>${product.originalPrice.toFixed(2)}</del>
                  )}
                </div>
                <Link
                  className="bestsellers_action"
                  to={`/productdetail/${product.id}`}
                  aria-label={`View ${product.name}`}
                >
                  <ShoppingBag size={18} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
