import SortSelect from "../shop/SortSelect";
import { useSearchParams } from "react-router-dom";
export default function ProductCard({ count, sort }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSort(value) {
    const next = new URLSearchParams(searchParams);
    if (value === "featured") {
      next.delete("sort");
    } else {
      next.set("sort", value);
    }
    setSearchParams(next);
  }

  return (
    <section className="shop-page_header">
      <div className="shop-page_heading">
        <div>
          <p className="bestsellers_eyebrow">All products</p>
          <h1 className="bestsellers_title">Find your next upgrade</h1>
          <p className="shop-page_description">
            Explore the latest tech and find the right fit for you.
          </p>{" "}
          <div className="shop-page_toolbar">
            <p className="shop-page_count">
              Showing {count} {count === 1 ? "product" : "products"}
            </p>
            <SortSelect value={sort} onChange={handleSort} />
          </div>
        </div>
      </div>
    </section>
  );
}
