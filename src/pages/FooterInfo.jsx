import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";

const pages = {
  "order-tracking": {
    title: "Order Tracking Portal",
    paragraphs: [
      "Order tracking is not connected in this demo. In a live store, use the carrier tracking link in your shipping confirmation.",
    ],
  },
  "warranty-registration": {
    title: "Warranty & Registration",
    paragraphs: [
      "Warranty registration is not available in this demo. Keep your receipt and device serial number for when a registration service is connected.",
    ],
  },
  "returns-refunds": {
    title: "Returns & Global Refunds",
    paragraphs: [
      "Returns and refunds cannot be started here because this demo is not connected to an order system. Check the retailer's official return policy before sending a product.",
    ],
  },
  "trade-in-recycling": {
    title: "Trade-In & Recycling",
    paragraphs: [
      "Trade-in valuations and recycling collection are not available in this demo.",
    ],
  },
  "live-tech-specialist": {
    title: "Live Tech Specialist",
    paragraphs: [
      "Live chat is not connected in this demo. Support contact details will be added when a service is available.",
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    paragraphs: [
      "This demo does not send newsletter signups to an email service or store the submitted address. The signup form only displays a confirmation in your browser.",
      "This is placeholder information, not an official privacy policy. Replace it with the store's approved policy before launch.",
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    paragraphs: [
      "Official terms of service have not been configured for this demo. Replace this notice with approved terms before accepting orders.",
    ],
  },
  "security-specs": {
    title: "Security Specs",
    paragraphs: [
      "Formal security specifications have not been published for this demo. Do not enter sensitive payment or personal information.",
    ],
  },
};

export default function FooterInfo() {
  const { slug } = useParams();
  const page = pages[slug];

  return (
    <>
      <Layout />
      <main className="footer-info">
        {page ? (
          <>
            <h1>{page.title}</h1>
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </>
        ) : (
          <>
            <h1>Page not found</h1>
            <p>This footer page does not exist.</p>
          </>
        )}
        <Link to="/shop">Browse the store</Link>
      </main>
      <Footer />
    </>
  );
}
