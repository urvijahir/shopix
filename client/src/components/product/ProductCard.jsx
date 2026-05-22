import { motion } from "framer-motion";

function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-xl"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-72 w-full object-cover"
      />

      <div className="p-5">
        <p className="text-sm font-medium text-blue-600">{product.category}</p>

        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
          {product.title}
        </h3>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-bold text-zinc-900">
            ${product.price}
          </span>

          <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
