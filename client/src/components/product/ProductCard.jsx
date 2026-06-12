import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToWishlist } from "../../redux/wishlistSlice";

import toast from "react-hot-toast";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xls dark:bg-zinc-900">
      {/* IMAGE */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-cover transition duration-300 hover:scale-105"
        />
      </Link>

      {/* CONTENT */}
      <div className="p-6">
        <p className="text-sm font-semibold text-blue-600">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
            {product.category}
          </span>
        </p>

        <h2 className="line-clamp-2 text-lg font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-white">
          {product.title}
        </h2>

        <div className="mt-8 flex items-center justify-between ">
          <span className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            ${product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="rounded-2xl bg-black px-6 py-3 font-medium text-white transition hover:scale-105"
          >
            View
          </Link>

          <button
            onClick={() => {
              dispatch(addToWishlist(product));

              toast.success("Added to wishlist");
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white p-3 shadow-md dark:bg-zinc-900"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
