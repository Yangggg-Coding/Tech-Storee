import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import useProducts from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import "../styles/productDetail.css";

const departments = [
  { name: "Shop all", to: "/shop" },
  { name: "Computers", to: "/shop?category=computers" },
  { name: "Phones & tablets", to: "/shop?category=phones" },
  { name: "Audio", to: "/shop?category=audio" },
  { name: "Gaming", to: "/shop?category=gaming" },
  { name: "Smart home", to: "/shop?category=smart-home" },
  { name: "Accessories", to: "/shop?category=accessories" },
];

export default function ProductDetail() {
  const { products, loading, error } = useProducts();
  const { id } = useParams();
  const [option, setOption] = useState("");
  const [finish, setFinish] = useState(""); // color1
  const [wishlist, setWishlist] = useState([]);

  function toLabel(key) {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
  }

  function toggleWishlist(productId) {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((item) => item !== productId)
        : [...prev, productId],
    );
  }

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      setOption(product.options[0]);
      setFinish(product.finishes[0]);
    }
  }, [product]);

  if (loading)
    return (
      <section className="product-detail_status">Loading product…</section>
    );
  if (error)
    return (
      <section
        className="product-detail_status product-detail_status--error"
        role="alert"
      >
        We couldn’t load this product: {error}
      </section>
    );
  if (!product) {
    return (
      <>
        <Layout />
        <section className="product-detail_missing">
          <h1>Product not found</h1>
          <Link to="/shop">Back to shop</Link>
        </section>
        <Footer />
      </>
    );
  }

  const price = product.optionPrices?.[option] ?? product.price;

  return (
    <>
      <Layout />
      <main className="product-detail">
        <nav className="product-detail_breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <Link to="/shop">Catalog</Link>
          <span>&gt;</span>
          <Link to="/shop">{product.category}</Link>
          <span>&gt;</span>
          <span>{product.name}</span>
        </nav>

        <section className="product-detail_layout">
          <div className="product-detail_image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail_info">
            <p className="product-detail_brand">{product.brand}</p>
            <h1 className="product-detail_title">{product.name}</h1>
            <p className="product-detail_rating">
              <Star size={15} fill="currentColor" /> {product.rating}{" "}
              <span>| {product.reviewCount} Reviews</span>
            </p>
            <p className="product-detail_description">{product.description}</p>
            <div className="product-detail_price-row">
              <strong className="product-detail_price">
                ${price.toFixed(2)}
              </strong>
            </div>

            <fieldset className="product-detail_choices">
              <legend>
                Storage <span>({product.options.length} options)</span>
              </legend>
              <div className="product-detail_option-list">
                {product.options.map((o) => (
                  <button
                    type="button"
                    key={o}
                    className={
                      o === option
                        ? "product-detail_option product-detail_option--active"
                        : "product-detail_option"
                    }
                    onClick={() => setOption(o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="product-detail_choices">
              <legend>
                Finish <span>({product.finishes.length} colors)</span>
              </legend>
              <div className="product-detail_finish-list">
                {product.finishes.map((f) => (
                  <button
                    type="button"
                    key={f}
                    className={
                      f === finish
                        ? "product-detail_finish product-detail_finish--active"
                        : "product-detail_finish"
                    }
                    style={{ background: f }}
                    onClick={() => setFinish(f)}
                    aria-label={`Color ${f}`}
                  ></button>
                ))}
              </div>
            </fieldset>

            <div className="product-detail_actions">
              <button
                type="button"
                className="button button--primary product-detail_add-cart"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>

              <button
                type="button"
                className={
                  wishlist.includes(product.id)
                    ? "product-detail_wishlist product-detail_wishlist--active"
                    : "product-detail_wishlist"
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
                  size={18}
                  fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                />
                {wishlist.includes(product.id) ? "Saved" : "Wishlist"}
              </button>
            </div>

            <div className="product-detail_promises">
              <p>
                <Heart size={16} /> 30-day returns
              </p>
            </div>
          </div>
        </section>

        <section className="product-detail_specs">
          <h2>Product Details</h2>
          <dl>
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <dt>{toLabel(key)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <Footer />
    </>
  );
}
