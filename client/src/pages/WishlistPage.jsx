import { useSelector, useDispatch } from "react-redux";

import { removeFromWishlist } from "../redux/wishlistSlice";

function WishlistPage() {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  return (
    <section className="min-h-screen bg-white px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-4xl font-bold text-zinc-900 dark:text-white">
          Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-zinc-900"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-80 w-full object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                    ${item.price}
                  </p>

                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="mt-6 rounded-2xl bg-red-500 px-6 py-3 text-white"
                  >
                    Remove
                  </button>
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
