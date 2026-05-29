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
    <section className="bg-white px-6 py-10 dark:bg-zinc-950">
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
                  : "bg-white text-zinc-900 shadow-sm hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900 dark:text-white"
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
