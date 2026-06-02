import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { removeFromWishlist } from "../redux/wishlistSlice";

function WishlistPage() {
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <section className="min-h-screen bg-zinc-100 px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-4xl font-bold text-zinc-900 dark:text-white">
          Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-zinc-900">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-zinc-500">Save products you love.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:bg-zinc-900"
              >
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-80 w-full object-cover"
                  />
                </Link>

                <div className="p-6">
                  <p className="text-sm font-semibold text-blue-600">
                    {item.category}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h2>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                      ${item.price}
                    </span>

                    <button
                      onClick={() => dispatch(removeFromWishlist(item._id))}
                      className="rounded-2xl bg-red-500 px-5 py-3 font-medium text-white transition hover:scale-105"
                    >
                      Remove
                    </button>
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
