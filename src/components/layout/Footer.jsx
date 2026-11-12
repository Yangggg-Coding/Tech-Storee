/* import { Github, Instagram, MessageCircle, Youtube, Zap } from "lucide-react"; */
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const categories = [
  "Computers & Rigs",
  "Phones & Tablets",
  "Neural Audio Gear",
  "Gaming & VR Systems",
  "Smart Home Automation",
  "High-Speed Accessories",
];

const supportLinks = [
  "Order Tracking Portal",
  "Warranty & Registration",
  "Returns & Global Refunds",
  "Trade-In & Recycling",
  "Live Tech Specialist",
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer_main">
        <section className="site-footer_brand">
          <Link className="site-footer_logo" to="/" aria-label="Volit home">
            <span className="site-footer_logo-mark">
              {/*               <Zap size={19} fill="currentColor" /> */}
            </span>
            <span>volt</span>
          </Link>
          <p>
            Pioneering high-performance computing, mobile devices, smart
            automation, and spatial audio systems.
          </p>
          <div className="site-footer_socials" aria-label="Social media">
            <a
              href="https://www.instagram.com/yanggxxyz?dlrf=MXNsdjc2ZGU4M2w4ZA%3D%3D&utm_source=qr"
              target="_blank"
              aria-label="Instagram"
            >
              {/*            <Instagram size={18} /> */}
            </a>
            <a
              href="https://github.com/Yangggg-Coding"
              target="_blank"
              aria-label="GitHub"
            >
              {/*           <Github size={18} /> */}
            </a>
            <a
              href="https://www.facebook.com/share/1Ef3dmoRdy/?mibextid=wwXIfr"
              target="_blank"
              aria-label="facebook
            "
            >
              {/*               <MessageCircle size={18} /> */}
            </a>
            <a
              href="https://www.tiktok.com/@mhcwm_?_r=1&_t=ZS-9BLgRuMbArV"
              target="_blank"
              aria-label="Tiktok"
            >
              {/*    <Youtube size={18} /> */}
            </a>
          </div>
        </section>

        <section className="site-footer_column">
          <h2>Shop Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link to="/shop">{category}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="site-footer_column">
          <h2>Customer Support</h2>
          <ul>
            {supportLinks.map((item) => (
              <li key={item}>
                <Link to="/shop">{item}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="site-footer_newsletter">
          <h2>Volit Insider Newsletter</h2>
          <p>
            Subscribe for hardware releases, benchmarks, and 10% discount
            vouchers.
          </p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="visually-hidden" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Enter your email"
            />
            <button type="submit">Subscribe Now</button>
          </form>
        </section>
      </div>

      <div className="site-footer_bottom">
        <p>
          © 2026 Volit Inc. All rights reserved. High-Performance Hardware
          Solutions.
        </p>
        <nav aria-label="Legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#security">Security Specs</a>
        </nav>
      </div>
    </footer>
  );
}
