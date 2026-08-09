import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { removeFromWishlist } from "../redux/wishlistSlice";

function WishlistPage() {
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100 px-6 py-14 dark:from-[#0F0A1F] dark:via-[#18122B] dark:to-[#1F1B33]">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-4xl font-bold text-zinc-900 dark:text-white">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="rounded-[32px] border border-white/50 bg-white/80 p-12 text-center shadow-xl backdrop-blur-xl dark:border-violet-900/40 dark:bg-[#181424]/90">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-5xl dark:bg-violet-900/30">
              💜
            </div>

            <h2 className="mt-8 text-3xl font-bold text-zinc-900 dark:text-white">
              Your Wishlist is Empty
            </h2>

            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
              Browse products and save your favorites here.
            </p>

            <Link
              to="/"
              className="mt-8 inline-block rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-[30px] border border-white/50 bg-white shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl dark:border-zinc-800 dark:bg-[#181424]"
              >
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full object-cover transition duration-500 hover:scale-110"
                  />
                </Link>

                <div className="p-6">
                  <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                    {item.category}
                  </p>

                  <h2 className="mt-4 line-clamp-2 text-xl font-bold text-zinc-900 transition hover:text-violet-600 dark:text-white">
                    {item.title}
                  </h2>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-violet-600 dark:text-violet-400">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/product/${item._id}`}
                        className="flex-1 rounded-2xl bg-violet-600 py-3 text-center font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30"
                      >
                        View Product
                      </Link>

                      <button
                        onClick={() => dispatch(removeFromWishlist(item._id))}
                        className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white dark:border-red-900 dark:bg-red-900/20 dark:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default WishlistPage;
