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
    <section className="min-h-screen bg-zinc-100 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h1 className="mb-8 text-4xl font-bold text-zinc-900">
              Shipping Details
            </h1>

            <form onSubmit={submitHandler} className="space-y-6">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-black"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingData.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-black"
                required
              />

              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingData.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-black"
                  required
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={shippingData.postalCode}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-black"
                  required
                />
              </div>

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingData.country}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-black"
                required
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition hover:scale-[1.01]"
              >
                Place Order
              </button>
            </form>

            {/* SUCCESS MESSAGE */}
            {orderPlaced && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-6"
              >
                <h2 className="text-2xl font-bold text-green-700">
                  Order Placed Successfully 🎉
                </h2>

                <p className="mt-2 text-zinc-600">
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
          <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-8 text-3xl font-bold text-zinc-900">
              Order Summary
            </h2>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-zinc-800">{item.title}</p>

                    <span className="text-sm text-zinc-500">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <p className="font-semibold">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-zinc-200"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Subtotal</span>

                <span className="font-semibold">${subtotal}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Shipping</span>

                <span className="font-semibold">${shippingPrice}</span>
              </div>

              <div className="flex items-center justify-between text-2xl font-bold">
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
