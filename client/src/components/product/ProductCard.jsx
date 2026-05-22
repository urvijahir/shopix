import { motion } from "framer-motion";

function ProductCard() {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-xl"
    >
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        alt="product"
        className="h-72 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-lg font-semibold text-zinc-900">
          Premium Sneakers
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          Comfortable stylish sneakers for everyday use.
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-zinc-900">$120</span>

          <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
