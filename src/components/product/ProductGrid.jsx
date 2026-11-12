import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/shop.css";



export default function ProductGrid({ products }) {
  const [wishlist, setWishlist] = useState([]);

  if (products.length === 0) {
    return <p className="shop--empty">No products are available right now.</p>;
  }

  function toggleWishlist(id) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="bestsellers_grid shop_grid">
      {products.map((product) => (
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
                type="button"
                className={
                  wishlist.includes(product.id)
                    ? "reco_icon reco_icon--active"
                    : "reco_icon"
                }
                onClick={() => toggleWishlist(product.id)}
                aria-label={
                  wishlist.includes(product.id)
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
                aria-pressed={wishlist.includes(product.id)}
              >
                <Heart
                  size={16}
                  fill={wishlist.includes(product.id) ? "currentColor" : "none"}
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

                {/* disscount */}
                {/*   {product.originalPrice && (
                  <del>${product.originalPrice.toFixed(2)}</del>
                )} */}
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
  );
}
