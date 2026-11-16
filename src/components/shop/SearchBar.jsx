import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
export default function SearchBar({ initial = "" }) {
  const [text, setText] = useState(initial);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const q = text.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  function handleClear() {
    setText("");
    if (initial) navigate("/shop");
    inputRef.current?.focus();
  }

  return (
    <form className="navbar_search-wrap" role="search" onSubmit={handleSubmit}>
      <Search className="navbar_search-icon" size={20} />
      <input
        ref={inputRef}
        className="navbar_search"
        type="search"
        placeholder="Find your next upgrade"
        aria-label="Search products"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text ? (
        <button
          type="button"
          className="navbar_clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      ) : (
        <kbd className="navbar_kbd">Ctrl K</kbd>
      )}
    </form>
  );
}
