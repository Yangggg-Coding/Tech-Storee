import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Headset,
  UserRound,
  Heart,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import "../../styles/navbar.css";
const departments = [
  { name: "Shop all", to: "/shop" },
  { name: "Computers", to: "/shop" },
  { name: "Phones & tablets", to: "/shop" },
  { name: "Audio", to: "/shop" },
  { name: "Gaming", to: "/shop" },
  { name: "Smart home", to: "/shop" },
  { name: "Accessories", to: "/shop" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__main">
        <Link to="/" className="navbar__brand">
          volt<span>.</span>
        </Link>

        <div className="navbar__search-wrap">
          <Search className="navbar__search-icon" size={20} />
          <input
            className="navbar__search"
            type="search"
            placeholder="Find your next upgrade"
          />
          <kbd className="navbar__kbd">⌘ K</kbd>
        </div>

        <div className="navbar__tools">
          <button className="navbar__tool">
            <Headset size={20} />
            <span>Ask an expert</span>
          </button>
          <button className="navbar__tool" aria-label="Account">
            <UserRound size={20} />
          </button>
          <button className="navbar__tool" aria-label="Wishlist">
            <Link to="/wishlist">
              <Heart size={20} />
            </Link>
          </button>
          <Link to="/cart" className="navbar__tool" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="navbar__count">0</span>
          </Link>
        </div>
      </div>

      <nav className="navbar__categories">
        <ul className="navbar__departments">
          {departments.map((d) => (
            <li key={d.name}>
              <NavLink to={d.to}>{d.name}</NavLink>
            </li>
          ))}
        </ul>
        <ul className="navbar__featured">
          <li>
            <NavLink to="/shop">New arrivals</NavLink>
          </li>
          <li>
            <NavLink to="/shop" className="navbar__drop">
              The weekly drop <ArrowUpRight size={14} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
