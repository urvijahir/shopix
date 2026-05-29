import { useEffect, useState } from "react";
import axios from "axios";

import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/product/FeaturedProducts";
import CategorySection from "../components/category/CategorySection";

function HomePage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ? true : product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="bg-white dark:bg-zinc-950 min-h-screen">
        <HeroSection />

        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FeaturedProducts
          products={filteredProducts}
          loading={loading}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </>
  );
}

export default HomePage;
