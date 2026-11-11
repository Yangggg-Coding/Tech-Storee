export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

export function sortProducts(products, sortKey) {
  const list = [...products];

  switch (sortKey) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "rating":
      return list.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
      );
    case "newest":
      return list.sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    default:
      return list;
  }
}