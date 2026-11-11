import SortSelect from "../shop/SortSelect";
export default function ProductCard({ count, sort, onSortChange }) {
  return (
    <section className="shop-page__header">
      <div className="shop-page__heading">
        <div>
          <p className="bestsellers__eyebrow">All products</p>
          <h1 className="bestsellers__title">Find your next upgrade</h1>
          <p className="shop-page__description">
            Explore the latest tech and find the right fit for you.
          </p>{" "}
          <div className="shop-page__toolbar">
            <p className="shop-page__count">
              Showing {count} {count === 1 ? "product" : "products"}
            </p>
            <SortSelect value={sort} onChange={onSortChange} />
          </div>
        </div>
      </div>
    </section>
  );
}
