import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    badge: "GRADE A CERTIFIED",
    name: 'Refurbished VoltBook Pro 14"',
    description: "Thoroughly inspected and recertified, with a one-year warranty.",
    oldPrice: "$1,899.00",
    price: "$1,349.00",
  },
  {
    id: 2,
    badge: "OPEN-BOX LIKE NEW",
    name: "Open-box Matrix VR Headset",
    description: "A customer return in its original box with all included accessories.",
    oldPrice: "$899.00",
    price: "$699.00",
  },
  {
    id: 3,
    badge: "FACTORY RESEALED",
    name: "Refurbished Aether Pro ANC Headphones",
    description: "Acoustically tested, cleaned, and fitted with new ear cushions.",
    oldPrice: "$349.00",
    price: "$239.00",
  },
];

export default function ValueOutlet() {
  return (
    <section className="value-outlet" id="open-box">
      <div className="value-outlet__header">
        <div>
          <p className="value-outlet__eyebrow">Good tech, better value</p>
          <h2 className="value-outlet__title">Certified refurbished &amp; open-box</h2>
        </div>
        <Link to="/shop" className="value-outlet__link">Explore the collection <ArrowRight size={17} /></Link>
      </div>
      <div className="value-outlet__grid">
        {products.map((product) => (
          <article className="value-outlet__card" key={product.id}>
            <div className="value-outlet__body">
              <span className="value-outlet__badge">{product.badge}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
            <div className="value-outlet__footer">
              <div className="value-outlet__prices">
                <del>{product.oldPrice}</del>
                <strong>{product.price}</strong>
              </div>
              <Link className="value-outlet__action" to="/shop">Explore</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
