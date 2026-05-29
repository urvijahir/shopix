import ProductCard from "./ProductCard";
import ProductSkeleton from "../ui/ProductSkeleton";

function FeaturedProducts({ products, loading, search, setSearch }) {
  return (
    <section className="mx-auto max-w-7xl bg-white px-6 py-20 dark:bg-zinc-950">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Featured Products
          </p>

          <h2 className="mt-2 text-4xl font-bold text-zinc-900 dark:text-white">
            Trending Products
          </h2>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : products.length > 0 ? (
          products.map((item) => <ProductCard key={item.id} product={item} />)
        ) : (
          <div className="col-span-full rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-zinc-900">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
              No Products Found
            </h3>

            <p className="mt-3 text-zinc-500 dark:text-zinc-400">
              Try searching another product.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
