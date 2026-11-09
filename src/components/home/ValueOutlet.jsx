

const products = [
  {
    id: 1,
    badge: "GRADE A CERTIFIED",
    name: 'Refurbished NexusBook Ultra 14"',
    description:
      "Thoroughly inspected, factory re-certified with 1-Year warranty included.",
    oldPrice: "$1,899.00",
    price: "$1,349.00",
  },
  {
    id: 2,
    badge: "OPEN-BOX LIKE NEW",
    name: "Open-Box Matrix VR Headset",
    description:
      "Customer return item in original box with full factory accessories attached.",
    oldPrice: "$899.00",
    price: "$699.00",
  },
  {
    id: 3,
    badge: "FACTORY RE-SEALED",
    name: "Refurbished Aether Pro ANC Headphones",
    description:
      "Acoustically tested and disinfected with brand new ear cushions installed.",
    oldPrice: "$349.00",
    price: "$239.00",
  },
];

function ValueOutlet() {
  return (
    <section className="value-outlet" id="open-box">

      <div className="outlet-header">
        <div>
          <span className="outlet-label">VALUE OUTLET</span>
          <h2>Certified Refurbished &amp; Open-Box</h2>
        </div>

        <a href="#open-box" className="explore-link">
          Explore All Open-Box →
        </a>
      </div>


      <div className="outlet-grid">
        {products.map((product) => (
          <div className="outlet-card" key={product.id}>

            <div className="product-info">
              <span className="product-badge">
                {product.badge}
              </span>

              <h3>{product.name}</h3>

              <p>{product.description}</p>
            </div>

            <div className="product-footer">
              <div className="product-pricing">
                <span className="old-price">
                  {product.oldPrice}
                </span>

                <strong className="new-price">
                  {product.price}
                </strong>
              </div>

              <button className="claim-button" type="button">
                Claim Deal
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default ValueOutlet;
