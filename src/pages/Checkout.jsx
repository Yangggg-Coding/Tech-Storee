import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import BenefitsBar from "../components/home/BenefitsBar";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import "../styles/cart.css";

const paymentOptions = [
  { value: "card", name: "Credit or debit card", description: "Visa, Mastercard and Amex" },
  { value: "paypal", name: "PayPal", description: "Use your PayPal account" },
  { value: "wallet", name: "Digital wallet", description: "Apple Pay / Google Pay" },
];

export default function Checkout() {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartProducts = useMemo(
    () =>
      cart
        .map((item) => ({
          product: products.find((product) => product.id === item.productId),
          item,
        }))
        .filter(({ product }) => product),
    [cart, products],
  );

  const cartSubtotal = useMemo(
    () =>
      cartProducts.reduce((total, { product, item }) => {
        const price = product.optionPrices?.[item.option] ?? product.price;
        return total + price * item.quantity;
      }, 0),
    [cartProducts],
  );

  const shippingFee = 0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shippingFee + tax;

  function handlePlaceOrder(event) {
    event.preventDefault();

    if (!cartProducts.length) {
      return;
    }

    setOrderPlaced(true);
    setCart([]);
  }

  if (orderPlaced) {
    return (
      <>
        <Layout />
        <main className="cart-page">
          <div className="cart-page_inner checkout-success_wrap">
            <div className="checkout-success">
              <CheckCircle2 size={42} />
              <p className="cart-eyebrow">Order confirmed</p>
              <h1>Thank you for your purchase</h1>
              <p>
                Your payment with {paymentOptions.find((option) => option.value === paymentMethod)?.name} was received successfully.
              </p>
              <Link className="cart-checkout_button" to="/shop">
                Continue shopping
              </Link>
            </div>
          </div>
          <BenefitsBar />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Layout />
      <main className="cart-page">
        <div className="cart-page_inner">
          <Link className="cart-back" to="/cart">
            <ArrowLeft size={16} />
            Back to cart
          </Link>

          <header className="cart-header checkout-header">
            <div>
              <p className="cart-eyebrow">Secure checkout</p>
              <h1>Checkout</h1>
              <p className="cart-intro">
                Review your order and complete your payment.
              </p>
            </div>
            <span className="checkout-trust">
              <ShieldCheck size={16} />
              Secure payment
            </span>
          </header>

          <div className="checkout-layout">
            <form className="checkout-panel" onSubmit={handlePlaceOrder}>
              <section className="cart-panel">
                <div className="cart-panel_heading">
                  <span>01</span>
                  <div>
                    <h2>Payment method</h2>
                    <p>Choose how you would like to pay.</p>
                  </div>
                </div>

                <div className="cart-payment_methods checkout-payment_methods">
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
              </section>

              <section className="cart-panel">
                <div className="cart-panel_heading">
                  <span>02</span>
                  <div>
                    <h2>Card details</h2>
                    <p>Enter your payment information.</p>
                  </div>
                </div>

                <div className="cart-fields">
                  <fieldset className="cart-field cart-field_full">
                    <legend>Name on card</legend>
                    <input type="text" name="cardName" required />
                  </fieldset>
                  <fieldset className="cart-field cart-field_full">
                    <legend>Card number</legend>
                    <input type="text" name="cardNumber" inputMode="numeric" placeholder="1234 5678 9012 3456" required />
                  </fieldset>
                  <fieldset className="cart-field">
                    <legend>Expiry date</legend>
                    <input type="text" name="expiryDate" placeholder="MM/YY" required />
                  </fieldset>
                  <fieldset className="cart-field">
                    <legend>CVC</legend>
                    <input type="text" name="cvc" inputMode="numeric" placeholder="123" required />
                  </fieldset>
                </div>
              </section>

              <button className="cart-checkout_button" type="submit" disabled={loading || error || !cartProducts.length}>
                {loading ? "Loading..." : cartProducts.length ? "Complete purchase" : "Your cart is empty"}
              </button>
            </form>

            <aside className="checkout-summary">
              <h2>Order summary</h2>
              <div className="checkout-summary_items">
                {cartProducts.length === 0 ? (
                  <p className="checkout-empty">Your cart is empty.</p>
                ) : (
                  cartProducts.map(({ product, item }) => (
                    <div key={item.productId + JSON.stringify(item.option ?? "") } className="checkout-summary_item">
                      <div>
                        <strong>{product.name}</strong>
                        <small>
                          {item.quantity} × ${product.optionPrices?.[item.option] ?? product.price}
                        </small>
                      </div>
                      <span>
                        ${((product.optionPrices?.[item.option] ?? product.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="cart-payment_totals checkout-summary_totals">
                <div>
                  <span>Subtotal</span>
                  <strong>${cartSubtotal.toFixed(2)}</strong>
                </div>
                <div>
                  <span>Shipping</span>
                  <strong>${shippingFee.toFixed(2)}</strong>
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
            </aside>
          </div>
        </div>
        <BenefitsBar />
      </main>
      <Footer />
    </>
  );
}
