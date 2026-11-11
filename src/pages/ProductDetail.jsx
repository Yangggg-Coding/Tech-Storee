import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import useProducts from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { products, loading, error } = useProducts();
  const { id } = useParams();
  const [option, setOption] = useState("");
  const [finish, setFinish] = useState(""); // color1

  function toLabel(key) {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
  }
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      setOption(product.options[0]);
      setFinish(product.finishes[0]);
    }
  }, [product]);

  if (loading)
    return (
      <section className="bestsellers bestsellers--status">
        Loading bestsellers…
      </section>
    );
  if (error)
    return (
      <section className="bestsellers bestsellers--status" role="alert">
        We couldn’t load bestsellers: {error}
      </section>
    );

  const price = product.optionPrices[option] ?? product.price;

  return (
    <>
      <Layout />
      <section>
        <div>
          <Link to="/">
            Home &gt;{" "}
            <span>
              <Link to="/shop">Catalog &gt; </Link>
            </span>
            <span>
              <Link>{product.category} &gt; </Link>
            </span>
            <span>
              <Link>{product.name}</Link>
            </span>
          </Link>
        </div>
      </section>
      <section>
        <div>
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div>
          <p>{product.brand}</p>
          <h1>{product.name}</h1>
          <span>
            <Star size={15} fill="currentColor" /> {product.rating} |{" "}
            {product.reviewCount}
          </span>
          <p>{product.description}</p>
          <p>
            ${price.toFixed(2)}
            {/*    {product.originalPrice && (
              <span className="detail__old">
                ${product.originalPrice.toFixed(2)}
              </span> 
            )} */}
          </p>
          <div>
            {product.options.map((o) => (
              <button
                key={o}
                className={o === option ? "pill pill--active" : "pill"}
                onClick={() => setOption(o)}
              >
                {o}
              </button>
            ))}
          </div>
          <div>
            {product.finishes.map((f) => {
              <button
                key={f}
                className={""}
                style={{ background: f }}
                onClick={() => setFinish(f)}
                aria-label={`Color ${f}`}
              ></button>;
            })}
          </div>
          <div>
            <button>
              <ShoppingBag />
              Add to Cart
            </button>
            <Heart />
          </div>
        </div>
      </section>
      <section>
        <h3>Product Details</h3>
        <div>
          <table>
            <tbody>
              {Object.entries(product.specs).map(([key, value]) => (
                <tr key={key}>
                  <th>{toLabel(key)}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
}
