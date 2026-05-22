const categories = [
  "Fashion",
  "Electronics",
  "Accessories",
  "Furniture",
  "Beauty",
  "Travel",
];

function CategorySection() {
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
        {categories.map((category, index) => (
          <button
            key={index}
            className="rounded-full border border-zinc-300 px-6 py-3 font-medium transition hover:bg-black hover:text-white"
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
