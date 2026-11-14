import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import useProducts from "../hooks/useProducts";
import useWishlist from "../hooks/useWishlist";
import BenefitBar from "../components/home/BenefitsBar";
import { ArrowLeft, ArrowUpRight, Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/wishlist.css";

export default function Wishlist() {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useWishlist();
  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  function removeFromWishlist(id) {
    setWishlist((current) => current.filter((productId) => productId !== id));
  }

  return (
    <>
      <Layout />
      <main className="wishlist-page">
        <div className="wishlist-page_inner">
          <Link className="wishlist-back" to="/shop">
            <ArrowLeft size={16} />
            Continue shopping
          </Link>

          <header className="wishlist-header">
            <div>
              <p className="wishlist-eyebrow">Saved for later</p>
              <h1>Your wishlist</h1>
              <p className="wishlist-intro">
                Keep the tech you love all in one place.
              </p>
            </div>
            {!loading && !error && (
              <span className="wishlist-count">
                {savedProducts.length}{" "}
                {savedProducts.length === 1 ? "item" : "items"}
              </span>
            )}
          </header>

          {loading ? (
            <p className="wishlist-status">Loading your saved items…</p>
          ) : error ? (
            <p className="wishlist-status" role="alert">
              We couldn’t load products: {error}
            </p>
          ) : savedProducts.length === 0 ? (
            <section className="wishlist-empty">
              <span className="wishlist-empty_icon" aria-hidden="true">
                <Heart size={25} />
              </span>
              <h2>Your wishlist is waiting</h2>
              <p>
                Tap the heart on anything you love and it’ll be saved here.
              </p>
              <Link className="wishlist-shop-link" to="/shop">
                Explore the shop <ArrowUpRight size={17} />
              </Link>
            </section>
          ) : (
            <section className="wishlist-list" aria-label="Saved products">
              {savedProducts.map((product) => (
                <article className="wishlist-item" key={product.id}>
                  <Link
                    className="wishlist-item_image"
                    to={`/productdetail/${product.id}`}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img src={product.image} alt="" />
                  </Link>
                  <div className="wishlist-item_details">
                    <p className="wishlist-item_brand">{product.brand}</p>
                    <h2>
                      <Link to={`/productdetail/${product.id}`}>
                        {product.name}
                      </Link>
                    </h2>
                    <p className="wishlist-item_category">{product.category}</p>
                  </div>
                  <strong className="wishlist-item_price">
                    ${product.price.toFixed(2)}
                  </strong>
                  <Link
                    className="wishlist-item_view"
                    to={`/productdetail/${product.id}`}
                  >
                    View item <ArrowUpRight size={15} />
                  </Link>
                  <button
                    type="button"
                    className="wishlist-item_remove"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
              <button
                type="button"
                className="wishlist-clear"
                onClick={() => setWishlist([])}
              >
                Clear wishlist
              </button>
            </section>
          )}
        </div>
        <BenefitBar />
      </main>
      <Footer />
    </>
  );
}
