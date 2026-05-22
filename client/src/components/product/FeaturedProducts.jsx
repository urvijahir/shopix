import ProductCard from "./ProductCard";
import products from "../../data/products";

function FeaturedProducts() {
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

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search products..."
          className="rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {/* PRODUCT GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
