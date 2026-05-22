import ProductCard from "./ProductCard";

function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Featured Products
        </p>

        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
          Trending Products
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}

export default FeaturedProducts;
