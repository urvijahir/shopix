import ProductCard from "./ProductCard";
import ProductSkeleton from "../ui/ProductSkeleton";

function FeaturedProducts({
  products,
  loading,
  search,
  setSearch,
  sortOption,
  setSortOption,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
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
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full md:w-auto rounded-2xl border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        >
          <option value="default">Sort Products</option>

          <option value="low-high">Price: Low To High</option>

          <option value="high-low">Price: High To Low</option>

          <option value="a-z">Name: A-Z</option>
        </select>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : products.length > 0 ? (
          products.map((item) => <ProductCard key={item._id} product={item} />)
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
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          className="rounded-xl bg-black dark:bg-white px-5 py-3 text-white dark:text-black"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`h-12 w-12 rounded-xl font-semibold transition ${
              currentPage === index + 1
                ? "bg-black text-white"
                : "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          className="rounded-xl bg-black dark:bg-white px-5 py-3 text-white dark:text-black"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
