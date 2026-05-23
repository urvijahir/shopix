const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Accessories",
  "Furniture",
  "Beauty",
  "Travel",
];

function CategorySection({ selectedCategory, setSelectedCategory }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Categories
        </p>

        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
          Shop By Category
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-6 py-3 font-medium transition ${
              selectedCategory === category
                ? "bg-black text-white"
                : "border border-zinc-300 hover:bg-black hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory("All")}
          className="mt-6 text-sm font-medium text-zinc-500 hover:text-black"
        >
          Clear Filters
        </button>
      </div>
    </section>
  );
}

export default CategorySection;
