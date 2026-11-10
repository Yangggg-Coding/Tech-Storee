import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Free global shipping", text: "On orders over $50" },
  { icon: ShieldCheck, title: "2-year warranty", text: "Full hardware protection" },
  { icon: RotateCcw, title: "30-day money back", text: "Hassle-free returns" },
  { icon: Headset, title: "Expert support", text: "Here whenever you need us" },
];

export default function BenefitsBar() {
  return (
    <section className="benefits" aria-label="Shopping benefits">
      <div className="benefits__inner">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className="benefit" key={title}>
            <Icon className="benefit__icon" aria-hidden="true" />
            <div>
              <h2 className="benefit__title">{title}</h2>
              <p className="benefit__text">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
