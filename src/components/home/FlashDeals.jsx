import useProducts from "../../hooks/useProducts";

export default function FlashDeal() {
  const { products, loading, error } = useProducts();
  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>Error: {error}</p>;

  const deals = products.slice(0, 3);
  if (deals.length === 0) return null;

  return (
    <>
      <div>
        <div>
          <h2>Monthly Flash Deals</h2>
          <p>
            Limited quantities available at direct manufacturer clearance
            pricing.
          </p>
        </div>
        <p>Deals Expire In: </p>
      </div>
      <hr />
      <div>
        {deals.map((deal) => (
          <section key={deal.id}>
            <div>
              <img src={deal.image} alt={deal.name} />
            </div>
            <div>
              <p>{deal.category}</p>
              <p>{deal.name}</p>
              <p>${deal.price}</p>
              <hr />
              <button>Quick Claim Deal</button>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
