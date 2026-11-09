import Hero from "../components/home/Hero";
import Layout from "../components/layout/Layout";
import Bestsellers from "../components/home/Bestsellers";
import Trade from "../components/home/Trade";
export default function Home() {
  return (
    <>
      <Layout />
      <Hero />
      <Bestsellers />
      <Trade />
    </>
  );
}
