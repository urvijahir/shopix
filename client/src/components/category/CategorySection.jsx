function CategorySection({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Fashion",
    "Electronics",
    "Accessories",
    "Furniture",
    "Travel",
    "Beauty",
  ];

  return (
    <section className="px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">
          Shop By Category
        </h2>

        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-2xl px-6 py-3 font-medium transition-all duration-300
              ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-zinc-100 text-zinc-900 hover:bg-zinc-400 dark:bg-zinc-900 dark:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
