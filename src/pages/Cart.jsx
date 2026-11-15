import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import BenefitsBar from "../components/home/BenefitsBar";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { getCartItemKey, updateCartItemQuantity } from "../utils/cart";
import "../styles/cart.css";

const deliveryOptions = {
  fastest: { label: "Fastest delivery", eta: "within 1 day", fee: 100 },
  express: { label: "Express delivery", eta: "within 2–3 days", fee: 50 },
  standard: { label: "Standard delivery", eta: "within 5–7 days", fee: 0 },
};

const paymentOptions = [
  { value: "card", name: "Card", description: "Visa, Mastercard and Amex" },
  { value: "paypal", name: "PayPal", description: "Fast and secure" },
  { value: "wallet", name: "Digital wallet", description: "Apple Pay / Google Pay" },
];

export default function Cart() {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useCart();
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const cartProducts = cart
    .map((item) => ({
      product: products.find((product) => product.id === item.productId),
      item,
    }))
    .filter(({ product }) => product);

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartProducts.reduce((total, { product, item }) => {
    const price = product.optionPrices?.[item.option] ?? product.price;
    return total + price * item.quantity;
  }, 0);
  const deliveryFee = deliveryOptions[deliveryOption]?.fee ?? 0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + deliveryFee + tax;

  function changeQuantity(item, quantity) {
    setCart((current) => updateCartItemQuantity(current, item, quantity));
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
                {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
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
                <select
                  className="cart-delivery"
                  id="cart-delivery"
                  value={deliveryOption}
                  onChange={(event) => setDeliveryOption(event.target.value)}
                >
                  {Object.entries(deliveryOptions).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label} · {config.eta} · ${config.fee === 0 ? "Free" : config.fee}
                    </option>
                  ))}
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
                  <span className="cart-order_count">{cartQuantity}</span>
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
                    {cartProducts.map(({ product, item }) => {
                      const price =
                        product.optionPrices?.[item.option] ?? product.price;

                      return (
                        <article
                          className="cart-item"
                          key={getCartItemKey(item)}
                        >
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
                            <p className="cart-item_category">
                              {product.category}
                            </p>
                            {item.option && (
                              <p className="cart-item_category">
                                {item.option}
                              </p>
                            )}
                            <strong className="cart-item_price">
                              ${(price * item.quantity).toFixed(2)}
                            </strong>
                            <span className="cart-item_unit-price">
                              ${price.toFixed(2)} each
                            </span>
                            <div
                              className="cart-item_quantity"
                              aria-label={`Quantity of ${product.name}`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  changeQuantity(item, item.quantity - 1)
                                }
                                aria-label={`Decrease quantity of ${product.name}`}
                              >
                                <Minus size={14} />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  changeQuantity(item, item.quantity + 1)
                                }
                                aria-label={`Increase quantity of ${product.name}`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <button
                            className="cart-item_remove"
                            type="button"
                            onClick={() => changeQuantity(item, 0)}
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <Trash2 size={17} />
                          </button>
                        </article>
                      );
                    })}
                  </div>
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>${cartSubtotal.toFixed(2)}</strong>
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
                    <p>Choose a secure payment method.</p>
                  </div>
                </div>

                <div className="cart-payment_methods">
                  {paymentOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`cart-payment_option ${
                        paymentMethod === option.value ? "is-selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.value}
                        checked={paymentMethod === option.value}
                        onChange={(event) => setPaymentMethod(event.target.value)}
                      />
                      <span className="cart-payment_badge" aria-hidden="true">
                        {option.name.charAt(0)}
                      </span>
                      <span className="cart-payment_text">
                        <strong>{option.name}</strong>
                        <small>{option.description}</small>
                      </span>
                    </label>
                  ))}
                </div>

                <div className="cart-payment_totals">
                  <div>
                    <span>Subtotal</span>
                    <strong>${cartSubtotal.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>Shipping</span>
                    <strong>${deliveryFee.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>Estimated tax</span>
                    <strong>${tax.toFixed(2)}</strong>
                  </div>
                  <div className="cart-payment_total">
                    <span>Total</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                </div>

                <Link
                  className={`cart-checkout_button ${cartProducts.length === 0 ? "is-disabled" : ""}`}
                  to={cartProducts.length > 0 ? "/checkout" : "#"}
                  aria-disabled={cartProducts.length === 0}
                  onClick={(event) => {
                    if (cartProducts.length === 0) {
                      event.preventDefault();
                    }
                  }}
                >
                  Proceed to checkout
                </Link>
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
