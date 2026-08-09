import ProductCard from "./ProductCard";
import ProductSkeleton from "../ui/ProductSkeleton";
import CustomSelect from "../ui/CustomSelect";

function FeaturedProducts({
  products,
  loading,
  sortOption,
  setSortOption,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[3px] text-violet-600">
            Featured Collection
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Trending Products
          </h2>

          <p className="mt-3 max-w-xl text-zinc-500 dark:text-zinc-400">
            Explore our latest arrivals, best sellers, and customer favorites
            carefully selected for you.
          </p>
        </div>

        {/*  Sort */}
        <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
          <CustomSelect value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      {/* Products */}
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
              Try searching for another product.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`h-12 w-12 rounded-2xl font-semibold transition ${
              currentPage === index + 1
                ? "bg-violet-600 text-white shadow-lg"
                : "bg-zinc-200 text-zinc-900 hover:bg-violet-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
