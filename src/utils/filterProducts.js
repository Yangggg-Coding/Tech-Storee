export default function filterProducts({ products, category }) {
  if (!category) {
    return products;
  }
  return products.filter((product) => {
    return product.category === category;
  });
}
