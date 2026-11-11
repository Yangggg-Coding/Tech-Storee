import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

export default function Bestsellers() {
  const { products, loading, error } = useProducts();
  if (loading) return <section className="bestsellers bestsellers--status">Loading bestsellers…</section>;
  if (error) return <section className="bestsellers bestsellers--status" role="alert">We couldn’t load bestsellers: {error}</section>;

  const bests = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  if (bests.length === 0) return null;

  return (
    <section className="bestsellers">
      <div className="bestsellers__header">
        <div>
          <p className="bestsellers__eyebrow">Popular picks</p>
          <h2 className="bestsellers__title">Customer favorites</h2>
        </div>
        <Link className="bestsellers__link" to="/shop">Shop all phones <ArrowRight size={17} /></Link>
      </div>
      <div className="bestsellers__grid">
        {bests.map((product) => (
          <article className="bestsellers__card" key={product.id}>
            <Link className="bestsellers__image-wrap" to={`/productdetail/${product.id}`}>
              {product.badge && <span className="bestsellers__badge">{product.badge}</span>}
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="bestsellers__body">
              <div className="bestsellers__meta">
                <span>{product.brand}</span>
                <span className="bestsellers__rating"><Star size={15} fill="currentColor" /> {product.rating}</span>
              </div>
              <h3><Link to={`/productdetail/${product.id}`}>{product.name}</Link></h3>
              <div className="bestsellers__footer">
                <div>
                  <strong>${product.price.toFixed(2)}</strong>
                  {product.originalPrice && <del>${product.originalPrice.toFixed(2)}</del>}
                </div>
                <Link className="bestsellers__action" to={`/productdetail/${product.id}`} aria-label={`View ${product.name}`}>
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
