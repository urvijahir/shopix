import {
  Shirt,
  Laptop,
  Sofa,
  Sparkles,
  Briefcase,
  Gem,
  Grid2X2,
} from "lucide-react";
function CategorySection({ selectedCategory, setSelectedCategory }) {
  const categories = [
    {
      name: "All",
      icon: Grid2X2,
    },
    {
      name: "Fashion",
      icon: Shirt,
    },
    {
      name: "Electronics",
      icon: Laptop,
    },
    {
      name: "Accessories",
      icon: Gem,
    },
    {
      name: "Furniture",
      icon: Sofa,
    },
    {
      name: "Travel",
      icon: Briefcase,
    },
    {
      name: "Beauty",
      icon: Sparkles,
    },
  ];

  return (
    <section className="px-6 py-8" id="categories">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[3px] text-violet-600">
              Categories
            </p>

            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              Shop By Category
            </h2>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Discover products from your favorite collections.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`group rounded-[28px] border p-7 text-left transition-all duration-300
        ${
          selectedCategory === category.name
            ? "border-violet-600 bg-violet-600 text-white shadow-xl shadow-violet-300/30 dark:shadow-violet-900/40"
            : "border-zinc-200 bg-white hover:-translate-y-1 hover:scale-[1.03] hover:border-violet-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
        }`}
              >
                <div
                  className={`mb-5 inline-flex rounded-2xl p-4
          ${
            selectedCategory === category.name
              ? "bg-white/20"
              : "bg-violet-100 text-violet-600 dark:bg-violet-900/30"
          }`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-lg font-semibold">{category.name}</h3>

                <p
                  className={`mt-2 text-sm
          ${
            selectedCategory === category.name
              ? "text-violet-100"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
                >
                  Browse Collection
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
