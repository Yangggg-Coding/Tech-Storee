import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const categories = [
  { name: "Computers & Rigs", to: "/shop?category=computers" },
  { name: "Phones & Tablets", to: "/shop?category=phones" },
  { name: "Neural Audio Gear", to: "/shop?category=audio" },
  { name: "Gaming & VR Systems", to: "/shop?category=gaming" },
  { name: "Smart Home Automation", to: "/shop?category=smart-home" },
  { name: "High-Speed Accessories", to: "/shop?category=accessories" },
];

const supportLinks = [
  { name: "Order Tracking Portal", to: "/info/order-tracking" },
  { name: "Warranty & Registration", to: "/info/warranty-registration" },
  { name: "Returns & Global Refunds", to: "/info/returns-refunds" },
  { name: "Trade-In & Recycling", to: "/info/trade-in-recycling" },
  { name: "Live Tech Specialist", to: "/info/live-tech-specialist" },
];

export default function Footer() {
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setNewsletterMessage(
      "Thanks for your interest! This demo doesn't send or store email addresses.",
    );
  };

  return (
    <footer className="site-footer">
      <div className="site-footer_main">
        <section className="site-footer_brand">
          <Link className="site-footer_logo" to="/" aria-label="Volit home">
            <span>
              <img src="/images/hero/logo.jpg" width={50} alt="Volit" />
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
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/Yangggg-Coding"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/share/1Ef3dmoRdy/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} aria-hidden="true" />
            </a>
            <a
              href="https://www.tiktok.com/@mhcwm_?_r=1&_t=ZS-9BLgRuMbArV"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <FontAwesomeIcon icon={faTiktok} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="site-footer_column">
          <h2>Shop Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                <Link to={category.to}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="site-footer_column">
          <h2>Customer Support</h2>
          <ul>
            {supportLinks.map((item) => (
              <li key={item.name}>
                <Link to={item.to}>{item.name}</Link>
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
          <form onSubmit={handleNewsletterSubmit}>
            <label className="visually-hidden" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe Now</button>
          </form>
          {newsletterMessage && (
            <p className="site-footer_newsletter-status" role="status">
              {newsletterMessage}
            </p>
          )}
        </section>
      </div>

      <div className="site-footer_bottom">
        <p>
          © 2026 Volit Inc. All rights reserved. High-Performance Hardware
          Solutions.
        </p>
        <nav aria-label="Legal">
          <Link to="/info/privacy-policy">Privacy Policy</Link>
          <Link to="/info/terms-of-service">Terms of Service</Link>
          <Link to="/info/security-specs">Security Specs</Link>
        </nav>
      </div>
    </footer>
  );
}
