import { useState } from "react";
import { RefreshCw, Check } from "lucide-react";
import useProducts from "../../hooks/useProducts";

const conditions = [
  { value: "like-new", label: "Like New (Mint)", multiplier: 1 },
  { value: "good", label: "Good (Minor Wear)", multiplier: 0.8 },
  { value: "fair", label: "Fair (Visible Scratches)", multiplier: 0.6 },
];

export default function Trade() {
  const { products, loading, error } = useProducts();
  const [brand, setBrand] = useState("");
  const [productId, setProductId] = useState("");
  const [condition, setCondition] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const brands = [...new Set(products.map((p) => p.brand))];
  const brandProducts = products.filter((p) => p.brand === brand);
  const selectedDevice = brandProducts.find((p) => p.id === Number(productId));
  const selectedCondition = conditions.find((c) => c.value === condition);

  const credit =
    selectedDevice && selectedCondition
      ? Math.round(selectedDevice.price * 0.4 * selectedCondition.multiplier)
      : 0;

  return (
    <div className="trade">
      <section className="trade__intro">
        <RefreshCw size={24} />
        <p>Volt Trade-In Program</p>
        <h2>Turn Your Old Tech Into Instant Store Credit</h2>
        <p>
          Upgrade seamlessly. Estimate your old laptop, tablet, or phone
          trade-in value and apply it directly toward your new order today.
        </p>
        <div className="trade__perk">
          <Check size={16} />
          <p>Free Return Label</p>
        </div>
        <div className="trade__perk">
          <Check size={16} />
          <p>Data Wipe Guarantee</p>
        </div>
      </section>

      <section className="trade__form">
        <h3>Calculate Instant Credit</h3>

        <label htmlFor="brand">Brand</label>
        <select
          id="brand"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setProductId("");
          }}
        >
          <option value="">Choose a brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <label htmlFor="model">Model</label>
        <select
          id="model"
          value={productId}
          disabled={!brand}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Choose a model</option>
          {brandProducts.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <label htmlFor="condition">Condition</label>
        <select
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Choose a condition</option>
          {conditions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <div className="trade__result" aria-live="polite">
          <div> 
            <p className="trade__result-label">Estimated trade-in credit</p>
            <p className="trade__result-amount">${credit.toFixed(2)} Credit</p>
          </div>
          <button className="trade__apply" disabled={credit === 0}>
            Apply to my order
          </button>
        </div>
      </section>
    </div>
  );
}
