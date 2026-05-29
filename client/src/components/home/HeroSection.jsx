function HeroSection() {
  return (
    <section className="dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[4px]  text-blue-600">
            Modern Ecommerce
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-zinc-900  dark:text-white md:text-6xl">
            Discover Premium Products For Your Lifestyle
          </h1>

          <p className="mt-6 text-lg leading-8 dark:text-zinc-400">
            Explore modern fashion, electronics, accessories, and lifestyle
            essentials with smooth shopping experience.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-2xl bg-black dark:bg-white px-8 py-4 font-medium text-white dark:text-black transition hover:scale-105">
              Shop Now
            </button>

            <button className="rounded-2xl  border dark:border-zinc-600 dark:text-white px-8 py-4 font-medium transition hover:bg-black hover:text-white">
              Explore
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Hero"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
