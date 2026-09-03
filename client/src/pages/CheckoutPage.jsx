import { useState } from "react";

import axios from "axios";

import { BASE_URL } from "../config";

import { useSelector, useDispatch } from "react-redux";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { clearCart } from "../redux/cartSlice";

function CheckoutPage() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${BASE_URL}/api/orders`,
        {
          orderItems: cartItems,
          shippingAddress: shippingData,
          totalPrice,
          paymentMethod,
          isPaid: false,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      setPaymentMethod("Cash on Delivery");
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

      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error("Order failed");

      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-violet-50/30 to-white px-4 py-10 dark:from-zinc-950 dark:via-[#171225] dark:to-zinc-950 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-[#181424]">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-violet-600">
                Secure Checkout
              </p>

              <h1 className="mt-2 text-4xl font-extrabold text-zinc-900 dark:text-white lg:text-5xl">
                Shipping Details
              </h1>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingData.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
                required
              />

              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingData.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
                  required
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="ZIP Code"
                  value={shippingData.postalCode}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
                  required
                />
              </div>

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingData.country}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
                required
              />

              <div>
                <h2 className="mb-5 text-2xl font-bold text-zinc-900 dark:text-white">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {["Cash on Delivery", "UPI Demo", "Card Demo"].map(
                    (method) => (
                      <label
                        key={method}
                        className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all duration-300

                        ${
                          paymentMethod === method
                            ? "border-violet-600 bg-violet-50 dark:border-violet-500 dark:bg-violet-900/20"
                            : "border-zinc-200 bg-white hover:border-violet-400 hover:bg-violet-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:bg-violet-900/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="h-5 w-5 accent-violet-600"
                        />

                        <span className="font-medium text-zinc-900 dark:text-white">
                          {method}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>

            {/* SUCCESS */}
            {orderPlaced && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 shadow-lg dark:border-green-900 dark:from-green-950 dark:to-emerald-950"
              >
                <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
                  Order Placed Successfully 🎉
                </h2>

                <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
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
          <div className="sticky top-24 rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-[#181424]">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-violet-600">
                Order Summary
              </p>

              <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
                Review Your Order
              </h2>
            </div>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 rounded-2xl border border-zinc-200 bg-zinc-50 object-cover p-1 dark:border-zinc-700 dark:bg-zinc-900"
                    />

                    <div className="flex-1">
                      <h3 className="line-clamp-1 font-semibold text-zinc-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-violet-600">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-violet-200 dark:border-violet-800"></div>
            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Subtotal
                </span>

                <span className="font-semibold text-zinc-900 dark:text-white">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Shipping */}
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

              {/* Total */}
              <div className="mt-6 flex items-center justify-between border-t border-violet-200 pt-6 dark:border-violet-800">
                <span className="text-xl font-bold text-zinc-900 dark:text-white">
                  Total
                </span>

                <span className="text-3xl font-extrabold text-violet-600">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-violet-50 p-4 text-sm text-zinc-600 dark:bg-violet-900/20 dark:text-zinc-300">
                🔒
                <span>Your payment information is secure and encrypted.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CheckoutPage;
