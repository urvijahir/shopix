import { useEffect, useState } from "react";
import axios from "axios";

import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/product/FeaturedProducts";
import CategorySection from "../components/category/CategorySection";
import Features from "../components/home/Features";

import { BASE_URL } from "../config";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const search = useSelector((state) => state.search.search);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortOption, setSortOption] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products`);

        setProducts(data);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.hash === "#categories") {
      setTimeout(() => {
        document
          .getElementById("categories")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [location]);

  const filteredProducts = [...products]
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })

    .sort((a, b) => {
      if (sortOption === "low-high") {
        return a.price - b.price;
      }

      if (sortOption === "high-low") {
        return b.price - a.price;
      }

      if (sortOption === "a-z") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <HeroSection />

        <Features />

        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {error && (
          <div className="mx-auto mb-6 max-w-7xl rounded-xl bg-red-100 p-4 text-red-600">
            {error}
          </div>
        )}

        <FeaturedProducts
          products={currentProducts}
          loading={loading}
          sortOption={sortOption}
          setSortOption={setSortOption}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default HomePage;
