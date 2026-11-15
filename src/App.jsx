import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import FooterInfo from "./pages/FooterInfo";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/productdetail/:id" element={<ProductDetail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/info/:slug" element={<FooterInfo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
