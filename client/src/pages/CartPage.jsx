import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

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
  const shippingPrice = totalPrice >= 500 ? 0 : 20;

  const finalTotal = totalPrice + shippingPrice;

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-violet-50/30 to-white dark:from-zinc-950 dark:via-[#171225] dark:to-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="mt-2 text-4xl font-extrabold text-zinc-900 dark:text-white">
              Your Cart
            </h1>
          </div>

          <div className="rounded-2xl bg-violet-100 px-5 py-3 dark:bg-violet-900/30">
            <span className="font-semibold text-violet-700 dark:text-violet-300">
              {cartItems.length} Items
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-lg dark:border-zinc-800 dark:bg-[#181424]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
              🛒
            </div>

            <h2 className="mt-8 text-3xl font-bold text-zinc-900 dark:text-white">
              Your Cart is Empty
            </h2>

            <p className="mt-3 max-w-md text-zinc-500 dark:text-zinc-400">
              Looks like you haven't added anything yet. Start exploring our
              premium collections.
            </p>

            <Link
              to="/"
              className="mt-8 rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
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
                      className="h-28 w-28 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 object-contain transition-transform duration-300 hover:scale-105 dark:border-zinc-700 dark:bg-zinc-900"
                    />

                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-2xl font-bold text-violet-600">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.selectedColor && (
                          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                            {item.selectedColor}
                          </span>
                        )}

                        {item.selectedSize && (
                          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                            Size {item.selectedSize}
                          </span>
                        )}
                      </div>
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
                      className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-medium text-red-600 transition-all duration-300 hover:-translate-y-1 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky top-24 h-fit rounded-3xl border border-zinc-200 bg-white p-7 shadow-lg dark:border-zinc-800 dark:bg-[#181424]">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Subtotal
                  </span>

                  <span className="font-semibold text-zinc-900 dark:text-white">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Shipping
                  </span>

                  <span
                    className={`font-semibold ${
                      shippingPrice === 0
                        ? "text-green-600"
                        : "text-zinc-900 dark:text-white"
                    }`}
                  >
                    {shippingPrice === 0
                      ? "Free"
                      : `₹${shippingPrice.toLocaleString("en-IN")}`}
                  </span>
                </div>

                <div className="border-t border-violet-200 pt-5 dark:border-violet-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">
                      Total
                    </span>

                    <span className="text-3xl font-extrabold text-violet-600">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-8 flex w-full items-center justify-center rounded-2xl bg-violet-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
