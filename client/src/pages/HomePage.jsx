function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Modern Ecommerce
        </p>

        <h1 className="text-5xl font-bold leading-tight text-zinc-900">
          Discover Premium Products For Your Lifestyle
        </h1>

        <p className="mt-6 text-lg text-zinc-600">
          Clean modern shopping experience built using React and Node.js.
        </p>

        <button className="mt-8 rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:scale-105">
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default HomePage;
