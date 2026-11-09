import useProducts from "../../hooks/useProducts";
import { ShoppingBag } from "lucide-react";
export default function Bestsellers() {
  const { products, loading, error } = useProducts();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const bests = products.slice(0, 4);
  if (bests.length === 0) return null;
  return (
    <>
      <div>
        <p>Popular Choice</p>
        <div>
          <h2>Top Hardware Selection</h2>
          <div>
            <p>Best Seller</p>
            <p>Top rated</p>
            <p>Trending now</p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        {bests.map((best) => (
          <section key={best.id}>
            <div>
              <img src={best.image} alt={best.name} />
            </div>
            <div>
              <div>
                <p>{best.category}</p>
                <p>{best.rating}</p>
              </div>
              <p>{best.name}</p>
              <hr />
              <div>
                <span>${best.price}</span>
                <ShoppingBag size={20} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
