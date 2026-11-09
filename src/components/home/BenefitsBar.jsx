import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faShieldHalved,
  faRotateLeft,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const benefits = [
  {
    icon: faTruckFast,
    title: "Free Global Shipping",
    text: "On orders over $50",
  },
  {
    icon: faShieldHalved,
    title: "2-Year Warranty",
    text: "Full hardware protection",
  },
  {
    icon: faRotateLeft,
    title: "30-Day Money Back",
    text: "Hassle-free return policy",
  },
  {
    icon: faHeadset,
    title: "24/7 Tech Support",
    text: "Live specialist assistance",
  },
];

export default function BenefitsBar() {
  return (
    <section className="benefits">
      <div className="benefits__inner">
        {benefits.map((b) => (
          <div key={b.title} className="benefit">
            <FontAwesomeIcon icon={b.icon} className="benefit__icon" />
            <div>
              <h3 className="benefit__title">{b.title}</h3>
              <p className="benefit__text">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}