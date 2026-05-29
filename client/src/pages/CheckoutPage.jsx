import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { clearCart } from "../redux/cartSlice";

function CheckoutPage() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingPrice = subtotal > 500 ? 0 : 20;

  const totalPrice = subtotal + shippingPrice;

  const submitHandler = (e) => {
    e.preventDefault();

    setOrderPlaced(true);

    toast.success("Order placed successfully");

    dispatch(clearCart());

    setShippingData({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });
  };

  return (
    <section className="min-h-screen bg-zinc-100 px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
            <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-white">
              Shipping Details
            </h1>

            <form onSubmit={submitHandler} className="space-y-6">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingData.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
                required
              />

              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingData.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
                  required
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={shippingData.postalCode}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
                  required
                />
              </div>

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingData.country}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
                required
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition hover:scale-[1.01]"
              >
                Place Order
              </button>
            </form>

            {/* SUCCESS */}
            {orderPlaced && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950"
              >
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
                  Order Placed Successfully 🎉
                </h2>

                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                  Thank you for shopping with Shopix Store.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
            <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-white">
                      {item.title}
                    </p>

                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <p className="font-semibold text-zinc-900 dark:text-white">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-zinc-200 dark:border-zinc-700"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Subtotal
                </span>

                <span className="font-semibold text-zinc-900 dark:text-white">
                  ${subtotal}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Shipping
                </span>

                <span className="font-semibold text-zinc-900 dark:text-white">
                  ${shippingPrice}
                </span>
              </div>

              <div className="flex items-center justify-between text-2xl font-bold text-zinc-900 dark:text-white">
                <span>Total</span>

                <span>${totalPrice}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CheckoutPage;
