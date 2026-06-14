import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../redux/wishlistSlice";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const wishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const alreadyExists = wishlistItems.some(
      (item) => item._id === product._id,
    );

    if (alreadyExists) {
      toast.error("Already in wishlist");
      return;
    }

    dispatch(addToWishlist(product));
    toast.success("Added to wishlist");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-zinc-900">
      <button
        onClick={wishlistHandler}
        className="absolute right-4 top-4 z-10 rounded-full bg-white p-3 shadow-md transition hover:scale-110 dark:bg-zinc-800"
      >
        ❤️
      </button>

      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-cover transition duration-300 hover:scale-105"
        />
      </Link>

      <div className="p-6">
        <p className="mb-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
            {product.category}
          </span>
        </p>

        <Link to={`/product/${product._id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold text-zinc-900 transition hover:text-blue-600 dark:text-white">
            {product.title}
          </h2>
        </Link>

        <div className="mt-8 flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            ${product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="rounded-2xl bg-black px-6 py-3 font-medium text-white transition hover:scale-105 dark:bg-white dark:text-black"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
