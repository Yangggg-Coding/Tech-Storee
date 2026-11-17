import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Layout from "../components/layout/Layout";
import "../styles/notFound.css";

export default function NotFound() {
  return (
    <>
      <Layout />
      <main className="not-found">
        <div className="not-found_inner">
          <div className="not-found_art" aria-hidden="true">
            <span className="not-found_orbit not-found_orbit--outer" />
            <span className="not-found_orbit not-found_orbit--inner" />
            <span className="not-found_spark not-found_spark--one" />
            <span className="not-found_spark not-found_spark--two" />
            <span className="not-found_code">404</span>
            <span className="not-found_planet" />
            <span className="not-found_art-label">SIGNAL LOST</span>
          </div>

          <div className="not-found_copy">
            <p className="not-found_eyebrow">
              <Compass size={15} aria-hidden="true" />
              OUT OF RANGE
            </p>
            <h1>This page took a wrong turn.</h1>
            <p className="not-found_description">
              The link may be broken, or the page may have moved. Let’s get you
              back to the good stuff.
            </p>
            <div className="not-found_actions">
              <Link className="not-found_button not-found_button--primary" to="/">
                <ArrowLeft size={17} aria-hidden="true" />
                Back to home
              </Link>
              <Link className="not-found_button not-found_button--secondary" to="/shop">
                Explore the shop
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <p className="not-found_hint">
              Looking for something specific? Try browsing our latest tech.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
