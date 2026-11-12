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


export default function Navbar() {
  const departments = [
    { name: "Shop all", to: "/shop" },
    { name: "Computers", to: "/shop?category=computers" },
    { name: "Phones & tablets", to: "/shop?category=phones" },
    { name: "Audio", to: "/shop?category=audio" },
    { name: "Gaming", to: "/shop?category=gaming" },
    { name: "Smart home", to: "/shop?category=smart-home" },
    { name: "Accessories", to: "/shop?category=accessories" },
  ];

  return (
    <header className="navbar">
      <div className="navbar_main">
        <Link to="/" className="navbar_brand">
          volt<span>.</span>
        </Link>

        <div className="navbar_search-wrap">
          <Search className="navbar_search-icon" size={20} />
          <input
            className="navbar_search"
            type="search"
            placeholder="Find your next upgrade"
          />
          <kbd className="navbar_kbd">⌘ K</kbd>
        </div>

        <div className="navbar_tools">
          <button className="navbar_tool">
            <Headset size={20} />
            <span>Ask an expert</span>
          </button>
          <button className="navbar_tool" aria-label="Account">
            <UserRound size={20} />
          </button>
          <button className="navbar_tool" aria-label="Wishlist">
            <Link to="/wishlist">
              <Heart size={20} />
            </Link>
          </button>
          <Link to="/cart" className="navbar_tool" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="navbar_count">0</span>
          </Link>
        </div>
      </div>

      <nav className="navbar_categories">
        <ul className="navbar_departments">
          {departments.map((d) => (
            <li key={d.name}>
              <NavLink to={d.to}>{d.name}</NavLink>
            </li>
          ))}
        </ul>
        <ul className="navbar_featured">
          <li>
            <NavLink to="/shop?sort=newest" className="navbar_drop">
              New arrivals
              <ArrowUpRight size={14} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
