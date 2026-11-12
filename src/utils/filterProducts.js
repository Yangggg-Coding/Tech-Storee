export default function filterProducts(products, category) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}