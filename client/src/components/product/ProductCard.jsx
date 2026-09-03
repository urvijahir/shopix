import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const wishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.success("Removed from wishlist", {
        id: "wishlist-toast",
        duration: 1500,
      });
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist", {
        id: "wishlist-toast",
        duration: 1500,
      });
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative h-72 w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        {/* New Badge */}
        {product.isNewProduct && (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white shadow-md">
            New
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={wishlistHandler}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:scale-110 dark:bg-zinc-900/90"
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-zinc-500 dark:text-zinc-300"
            }
          />
        </button>

        <Link to={`/product/${product._id}`} className="block h-full w-full">
          <img
            src={product.colorImages?.[0]?.image || product.image}
            alt={product.title}
            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      <div className="space-y-4 p-6">
        <p className="mb-3">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            {product.category}
          </span>
        </p>

        <Link to={`/product/${product._id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold text-zinc-900 transition-colors duration-300 hover:text-violet-600 dark:text-white">
            {product.title}
          </h2>
        </Link>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                fill={
                  star <= Math.round(product.rating || 0)
                    ? "currentColor"
                    : "none"
                }
                className={
                  star <= Math.round(product.rating || 0)
                    ? "text-amber-400"
                    : "text-zinc-300 dark:text-zinc-700"
                }
              />
            ))}
          </div>

          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {product.rating ? product.rating.toFixed(1) : "0.0"}
          </span>

          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            ({product.numReviews || 0}{" "}
            {product.numReviews === 1 ? "Review" : "Reviews"})
          </span>
        </div>

        <div className="mt-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-zinc-400 line-through">
                ₹{Math.round(product.price * 1.25).toLocaleString("en-IN")}
              </span>

              <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                20% OFF
              </span>
            </div>
          </div>

          <Link
            to={`/product/${product._id}`}
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-400/40"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
