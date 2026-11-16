export default function filterProducts(products, category, query = "") {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return products.filter((p) => {
    const matchesCategory = !category || p.category === category;

    const haystack = [p.name, p.brand, p.category, p.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesQuery = words.every((word) => haystack.includes(word));

    return matchesCategory && matchesQuery;
  });
}
