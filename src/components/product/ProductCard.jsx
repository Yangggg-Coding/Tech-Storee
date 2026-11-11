import SortSelect from "../shop/SortSelect";
export default function ProductCard({ count, sort, onSortChange }) {
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
            <SortSelect value={sort} onChange={onSortChange} />
          </div>
        </div>
      </div>
    </section>
  );
}
