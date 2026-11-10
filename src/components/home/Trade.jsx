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

  const brands = [...new Set(products.map((p) => p.brand))];
  const brandProducts = products.filter((p) => p.brand === brand);
  const selectedDevice = brandProducts.find((p) => p.id === Number(productId));
  const selectedCondition = conditions.find((c) => c.value === condition);

  const credit =
    selectedDevice && selectedCondition
      ? Math.round(selectedDevice.price * 0.4 * selectedCondition.multiplier)
      : 0;

  return (
    <section className="trade">
      <section className="trade__intro">
        <RefreshCw className="trade__icon" size={24} aria-hidden="true" />
        <p className="trade__eyebrow">Trade in with Volt</p>
        <h2 className="trade__title">Your old phone could be someone else’s new one.</h2>
        <p>
          Get an estimate for your old tech and put its value toward your next
          upgrade. It’s a simple way to make a little room for something new.
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

      <div className="trade__panel">
        <section className="trade__form">
          <h3 className="trade__form-title">Estimate your trade-in</h3>
          {loading && <p className="trade__message" aria-live="polite">Loading eligible devices…</p>}
          {error && <p className="trade__message trade__message--error" role="alert">We couldn’t load devices: {error}</p>}

          <label htmlFor="trade-brand">Brand</label>
          <select
            id="trade-brand"
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

          <label htmlFor="trade-model">Model</label>
          <select
            id="trade-model"
            value={productId}
            disabled={!brand || loading || Boolean(error)}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Choose a model</option>
            {brandProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <label htmlFor="trade-condition">Condition</label>
          <select
            id="trade-condition"
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
        </section>

        <div className="trade__result" aria-live="polite">
          <div> 
            <p className="trade__result-label">Estimated trade-in credit</p>
            <p className="trade__result-amount">${credit.toFixed(2)}</p>
          </div>
          <button className="button button--primary trade__apply" type="button" disabled={credit === 0}>
            Apply credit
          </button>
        </div>
      </div>
    </section>
  );
}
