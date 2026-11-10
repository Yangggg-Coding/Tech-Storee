import Hero from "../components/home/Hero";
import Layout from "../components/layout/Layout";
import Bestsellers from "../components/home/Bestsellers";
import Trade from "../components/home/Trade";
import Recommended from "../components/home/Recommended";
import ValueOutlet from "../components/home/ValueOutlet";
import Footer from "../components/layout/Footer";
import "../styles/home.css";
export default function Home() {
  return (
    <>
      <Layout />
      <Hero />
      <Bestsellers />
      <Trade />
      <Recommended />
      <ValueOutlet />
      <Footer />
    </>
  );
}
