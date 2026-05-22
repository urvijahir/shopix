import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import FeaturedProducts from "../components/product/FeaturedProducts";

function HomePage() {
  return (
    <div>
      {/*  HERO SECTION */}
      <section className="mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 py-16 md:flex-row md:items-center md:justify-between">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Modern Ecommerce
          </p>

          <h1 className="text-4xl font-bold leading-tight text-zinc-900 md:text-6xl">
            Discover Premium Products For Your Lifestyle
          </h1>

          <p className="mt-6 text-lg text-zinc-600">
            Explore modern fashion, electronics, accessories, and lifestyle
            essentials with smooth shopping experience.
          </p>

          <div className="mt-8 flex gap-4">
            <Button>Shop Now</Button>

            <button className="rounded-xl border border-zinc-300 px-6 py-3 font-medium transition hover:bg-zinc-100">
              Explore
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-0"
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="product"
            className="h-[500px] w-full rounded-3xl object-cover shadow-2xl md:w-[450px]"
          />
        </motion.div>
      </section>
      <FeaturedProducts />
    </div>
  );
}

export default HomePage;
