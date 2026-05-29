import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      {/* IMAGE */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-80 w-full object-cover"
        />
      </Link>

      {/* CONTENT */}
      <div className="p-6">
        <p className="text-sm font-semibold text-blue-600">
          {product.category}
        </p>

        <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:bg-zinc-900 dark:text-white">
          {product.title}
        </h2>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-4xl font-bold text-zinc-900 dark:text-white">
            ${product.price}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="rounded-2xl bg-black px-6 py-3 font-medium text-white transition hover:scale-105"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
