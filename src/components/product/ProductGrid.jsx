import { ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/shop.css";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <p className="shop--empty">No products are available right now.</p>
    );
  }

  return (
    <div className="bestsellers__grid shop__grid">
      {products.map((product) => (
        <article className="bestsellers__card" key={product.id}>
          <Link
            className="bestsellers__image-wrap"
            to={`/productdetail/${product.id}`}
          >
            {product.badge && (
              <span className="bestsellers__badge">{product.badge}</span>
            )}
            <img src={product.image} alt={product.name} />
          </Link>
          <div className="bestsellers__body">
            <div className="bestsellers__meta">
              <span>{product.brand}</span>
              <span className="bestsellers__rating">
                <Star size={15} fill="currentColor" /> {product.rating}
              </span>
            </div>
            <h3>
              <Link to={`/productdetail/${product.id}`}>{product.name}</Link>
            </h3>
            <div className="bestsellers__footer">
              <div>
                <strong>${product.price.toFixed(2)}</strong>
                {product.originalPrice && (
                  <del>${product.originalPrice.toFixed(2)}</del>
                )}
              </div>
              <Link
                className="bestsellers__action"
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
