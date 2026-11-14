import { ArrowLeft, ArrowUpRight, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import BenefitsBar from "../components/home/BenefitsBar";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import "../styles/cart.css";

export default function Cart() {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useCart();
  const cartProducts = products.filter((product) => cart.includes(product.id));

  function removeFromCart(id) {
    setCart((current) => current.filter((productId) => productId !== id));
  }

  return (
    <>
      <Layout />
      <main className="cart-page">
        <div className="cart-page_inner">
          <Link className="cart-back" to="/shop">
            <ArrowLeft size={16} />
            Continue shopping
          </Link>

          <header className="cart-header">
            <div>
              <p className="cart-eyebrow">Almost yours</p>
              <h1>Your cart</h1>
              <p className="cart-intro">
                Review your items and enter your delivery details.
              </p>
            </div>
            {!loading && !error && (
              <span className="cart-count">
                {cartProducts.length}{" "}
                {cartProducts.length === 1 ? "item" : "items"}
              </span>
            )}
          </header>

          <div className="cart-layout">
            <section className="cart-details" aria-label="Delivery information">
              <section className="cart-panel">
                <div className="cart-panel_heading">
                  <span>01</span>
                  <div>
                    <h2>Personal information</h2>
                    <p>How can we reach you about your order?</p>
                  </div>
                </div>
                <div className="cart-fields">
                  <fieldset className="cart-field">
                    <legend>First name</legend>
                    <input type="text" name="firstName" autoComplete="given-name" required />
                  </fieldset>
                  <fieldset className="cart-field">
                    <legend>Last name</legend>
                    <input type="text" name="lastName" autoComplete="family-name" required />
                  </fieldset>
                  <fieldset className="cart-field">
                    <legend>Phone number</legend>
                    <input type="tel" name="phone" autoComplete="tel" required />
                  </fieldset>
                  <fieldset className="cart-field">
                    <legend>Email</legend>
                    <input type="email" name="email" autoComplete="email" required />
                  </fieldset>
                </div>
              </section>

              <section className="cart-panel">
                <div className="cart-panel_heading">
                  <span>02</span>
                  <div>
                    <h2>Shipping information</h2>
                    <p>Where should we send your order?</p>
                  </div>
                </div>
                <div className="cart-fields">
                  <fieldset className="cart-field">
                    <legend>Country / region</legend>
                    <input type="text" name="country" autoComplete="country-name" required />
                  </fieldset>
                  <fieldset className="cart-field">
                    <legend>City</legend>
                    <input type="text" name="city" autoComplete="address-level2" required />
                  </fieldset>
                  <fieldset className="cart-field">
                    <legend>Address</legend>
                    <input type="text" name="address" autoComplete="street-address" required />
                  </fieldset>
                  <fieldset className="cart-field">
                    <legend>Zip / postal code</legend>
                    <input type="text" name="postalCode" autoComplete="postal-code" required />
                  </fieldset>
                </div>
                <label className="cart-consent">
                  <input type="checkbox" required />
                  <span>I agree to data processing</span>
                </label>
              </section>

              <section className="cart-panel">
                <div className="cart-panel_heading">
                  <span>03</span>
                  <div>
                    <h2>Delivery</h2>
                    <p>Choose the delivery speed that works for you.</p>
                  </div>
                </div>
                <label className="cart-delivery_label" htmlFor="cart-delivery">
                  Delivery option
                </label>
                <select className="cart-delivery" id="cart-delivery" defaultValue="standard">
                  <option value="fastest">Fastest delivery · within 1 day · $100</option>
                  <option value="express">Express delivery · within 2–3 days · $50</option>
                  <option value="standard">Standard delivery · within 5–7 days · Free</option>
                </select>
              </section>
            </section>

            <aside className="cart-order" aria-label="Your cart">
              <div className="cart-order_heading">
                <div>
                  <p className="cart-order_eyebrow">Order overview</p>
                  <h2>Your items</h2>
                </div>
                {!loading && !error && (
                  <span className="cart-order_count">{cartProducts.length}</span>
                )}
              </div>

              {loading ? (
                <p className="cart-status">Loading your cart…</p>
              ) : error ? (
                <p className="cart-status" role="alert">
                  We couldn’t load your cart: {error}
                </p>
              ) : cartProducts.length === 0 ? (
                <section className="cart-empty">
                  <span className="cart-empty_icon" aria-hidden="true">
                    <ShoppingBag size={24} />
                  </span>
                  <h3>Your cart is waiting</h3>
                  <p>Add something you love and it’ll show up here.</p>
                  <Link className="cart-shop-link" to="/shop">
                    Explore the shop <ArrowUpRight size={16} />
                  </Link>
                </section>
              ) : (
                <>
                  <div className="cart-items">
                    {cartProducts.map((product) => (
                      <article className="cart-item" key={product.id}>
                        <Link
                          className="cart-item_image"
                          to={`/productdetail/${product.id}`}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <img src={product.image} alt="" />
                        </Link>
                        <div className="cart-item_details">
                          <p className="cart-item_brand">{product.brand}</p>
                          <h3>
                            <Link to={`/productdetail/${product.id}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <p className="cart-item_category">{product.category}</p>
                          <strong className="cart-item_price">
                            ${product.price.toFixed(2)}
                          </strong>
                        </div>
                        <button
                          className="cart-item_remove"
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </article>
                    ))}
                  </div>
                  <button
                    className="cart-clear"
                    type="button"
                    onClick={() => setCart([])}
                  >
                    Clear cart
                  </button>
                </>
              )}

              <section className="cart-payment">
                <div className="cart-panel_heading">
                  <span>04</span>
                  <div>
                    <h2>Payment</h2>
                    <p>Payment options will be available at checkout.</p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
        <BenefitsBar />
      </main>
      <Footer />
    </>
  );
}
