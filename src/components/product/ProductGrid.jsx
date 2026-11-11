import { ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/shop.css";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p className="shop--empty">No products are available right now.</p>;
  }

  return (
    <div className="bestsellers_grid shop_grid">
      {products.map((product) => (
        <article className="bestsellers_card" key={product.id}>
          <Link
            className="bestsellers_image-wrap"
            to={`/productdetail/${product.id}`}
          >
            {product.badge && (
              <span className="bestsellers_badge">{product.badge}</span>
            )}
            <img src={product.image} alt={product.name} />
          </Link>
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
  );
}
