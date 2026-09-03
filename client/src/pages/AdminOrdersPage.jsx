import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../config";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatusHandler = async (orderId, status) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/orders/${orderId}/status`,
        { status },
      );

      setOrders(orders.map((order) => (order._id === orderId ? data : order)));

      toast.success("Order status updated");
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    }

    if (status === "Shipped") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    }

    if (status === "Processing") {
      return "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    }

    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.shippingAddress?.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : (order.status || "Pending") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="min-h-screen bg-zinc-100 px-4 py-10 dark:bg-zinc-950 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-3xl font-bold text-zinc-900 dark:text-white sm:text-5xl">
          Admin Orders
        </h1>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <p className="text-zinc-500">📦 Total Orders</p>
            <h2 className="mt-2 text-3xl font-bold dark:text-white">
              {orders.length}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <p className="text-yellow-600">🟡 Pending</p>
            <h2 className="mt-2 text-3xl font-bold dark:text-white">
              {
                orders.filter((o) => (o.status || "Pending") === "Pending")
                  .length
              }
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <p className="text-blue-600">🚚 Shipped</p>
            <h2 className="mt-2 text-3xl font-bold dark:text-white">
              {orders.filter((o) => o.status === "Shipped").length}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <p className="text-green-600">✅ Delivered</p>
            <h2 className="mt-2 text-3xl font-bold dark:text-white">
              {orders.filter((o) => o.status === "Delivered").length}
            </h2>
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search Order ID or Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-2xl border border-zinc-300 bg-white px-5 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <div className="text-6xl">📦</div>

            <h2 className="mt-4 text-3xl font-bold dark:text-white">
              No Orders Found
            </h2>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-8"
              >
                <div className="mb-8 grid gap-5 md:grid-cols-4">
                  <div className="rounded-2xl bg-violet-50 p-5 dark:bg-zinc-800">
                    <p className="text-sm text-zinc-500">Order ID</p>

                    <h3 className="mt-2 font-bold text-zinc-900 dark:text-white">
                      #{order._id.slice(-6)}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-violet-50 p-5 dark:bg-zinc-800">
                    <p className="text-sm text-zinc-500">Order Date</p>

                    <h3 className="mt-2 font-bold text-zinc-900 dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-violet-50 p-5 dark:bg-zinc-800">
                    <p className="text-sm text-zinc-500">Total Amount</p>

                    <h3 className="mt-2 text-xl font-bold text-green-600">
                      ₹{order.totalPrice.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-violet-50 p-5 dark:bg-zinc-800">
                    <p className="text-sm text-zinc-500">Status</p>

                    <span
                      className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                        order.status || "Pending",
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>

                <div className="mb-6 rounded-2xl bg-violet-50 p-6 dark:bg-zinc-800">
                  <h3 className="font-bold text-zinc-900 dark:text-white">
                    Customer
                  </h3>

                  <p className="mt-3 font-medium text-zinc-900 dark:text-white">
                    {order.shippingAddress?.fullName}
                  </p>

                  <p className="text-zinc-500">
                    {order.user?.email || "No email available"}
                  </p>

                  <p className="mt-2 text-zinc-500">
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.country}
                  </p>
                </div>

                <div className="mb-6 rounded-2xl bg-violet-50 p-6 dark:bg-zinc-800">
                  <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
                    💳 Payment Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-zinc-500">Payment Method</p>

                      <p className="mt-1 font-semibold text-zinc-900 dark:text-white">
                        {order.paymentMethod || "Cash on Delivery"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Payment Status</p>

                      <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                          order.isPaid
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 border-t border-zinc-200 pt-6 dark:border-zinc-700">
                  <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                    Ordered Products
                  </h3>
                  <div className="space-y-5">
                    {order.orderItems?.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-5 rounded-2xl border border-violet-100 bg-violet-50 p-5 transition duration-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 lg:flex-row lg:items-center lg:justify-between"
                      >
                        <div className="flex items-center gap-5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-24 w-24 rounded-2xl object-cover shadow"
                          />

                          <div>
                            <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                              {item.title}
                            </h4>

                            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500">
                              <span>
                                Qty : <strong>{item.quantity}</strong>
                              </span>

                              {item.selectedColor && (
                                <span>
                                  Color : <strong>{item.selectedColor}</strong>
                                </span>
                              )}

                              {item.selectedSize && (
                                <span>
                                  Size : <strong>{item.selectedSize}</strong>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/product/${item._id}`}
                          className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-center font-semibold text-white transition duration-300 hover:scale-105"
                        >
                          View Product
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="my-8 border-violet-100 dark:border-zinc-700" />
                <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-violet-50 p-5 dark:bg-zinc-800 md:flex-row md:items-center">
                  <label className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Update Status:
                  </label>

                  <select
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      updateStatusHandler(order._id, e.target.value)
                    }
                    className="rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminOrdersPage;
