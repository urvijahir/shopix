import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/orders`);

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-6 py-16 dark:from-zinc-950 dark:via-zinc-950 dark:to-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
            Order History
          </p>

          <h1 className="mt-2 text-5xl font-extrabold text-zinc-900 dark:text-white">
            My Orders
          </h1>

          <p className="mt-3 text-zinc-500 dark:text-zinc-400">
            Track every purchase you've made with Shopix.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[32px] border border-violet-100 bg-white p-16 text-center shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-6xl">📦</div>

            <h2 className="mt-4 text-3xl font-bold dark:text-white">
              No Orders Yet
            </h2>
            <Link
              to="/"
              className="mt-8 inline-block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 font-semibold text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900"
              >
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      Order ID
                    </h3>

                    <p className="font-medium text-zinc-500">
                      #{order._id.slice(-6)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      Date
                    </h3>

                    <p className="text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current"></span>
                        {order.status || "Pending"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      Total
                    </h3>

                    <p className="text-2xl font-extrabold text-violet-600">
                      ₹{order.totalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 mb-6">
                  <div className="rounded-2xl bg-violet-50 px-6 py-4 dark:bg-zinc-800">
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      Shipping Address
                    </h3>

                    <p className="text-zinc-500">
                      {order.shippingAddress?.fullName}
                    </p>

                    <p className="text-zinc-500">
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.country}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-violet-50 px-6 py-4 dark:bg-zinc-800">
                  <h3 className="font-bold text-zinc-900 dark:text-white">
                    Payment
                  </h3>

                  <p className="text-zinc-500">
                    {order.paymentMethod || "Cash on Delivery"}
                  </p>
                </div>

                <div className="pt-8">
                  <h3 className="mb-4 text-xl font-bold dark:text-white">
                    Products
                  </h3>
                  <div className="space-y-5">
                    {order.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-violet-50 p-4 transition duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                      >
                        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-20 w-20 rounded-xl object-cover"
                          />

                          <div>
                            <h4 className="line-clamp-2 break-words text-base font-semibold text-zinc-900 dark:text-white sm:text-lg">
                              {item.title}
                            </h4>

                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                              Qty: {item.quantity}
                            </p>

                            {item.selectedColor && (
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
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

                        <Link
                          to={`/product/${item._id}`}
                          className="w-full shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-center font-medium text-white transition duration-300 hover:scale-105 sm:w-auto"
                        >
                          View Details
                        </Link>
                      </div>
                    ))}
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

export default OrdersPage;
