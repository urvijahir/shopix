import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";
import ProductSkeleton from "../ui/ProductSkeleton";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

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

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Featured Products
          </p>

          <h2 className="mt-2 text-4xl font-bold text-zinc-900">
            Trending Products
          </h2>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          className="rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          products.map((item) => <ProductCard key={item.id} product={item} />)
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
