import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const getCartPayload = (item) => ({
    _id: item._id,
    selectedColor: item.selectedColor,
    selectedSize: item.selectedSize,
  });

  return (
    <section className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-10 text-4xl font-bold text-zinc-900 dark:text-white">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item._id}-${item.selectedColor || "no-color"}-${
                  item.selectedSize || "no-size"
                }`}
                className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                      ${item.price}
                    </p>

                    {item.selectedColor && (
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Color: {item.selectedColor}
                      </p>
                    )}

                    {item.selectedSize && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Size: {item.selectedSize}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(getCartPayload(item)))
                    }
                    className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                  >
                    -
                  </button>

                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(getCartPayload(item)))
                    }
                    className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(getCartPayload(item)))
                    }
                    className="rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-10 rounded-3xl bg-black p-6 text-white">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Total</h2>

                  <span className="mt-2 block text-3xl font-bold">
                    ${totalPrice}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="inline-block rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105"
                >
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
