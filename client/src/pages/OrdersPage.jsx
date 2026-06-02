import { useEffect, useState } from "react";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders");

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="min-h-screen bg-zinc-100 px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-4xl font-bold text-zinc-900 dark:text-white">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
            <div className="text-6xl">📦</div>

            <h2 className="mt-4 text-3xl font-bold dark:text-white">
              No Orders Yet
            </h2>

            <p className="mt-2 text-zinc-500">
              Start shopping to see your orders here.
            </p>
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
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                        Delivered
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      Total
                    </h3>

                    <p className="font-bold text-green-600">
                      ${order.totalPrice}
                    </p>
                  </div>
                </div>
                <div className="mt-4 mb-6">
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

                <div className="border-t border-zinc-200 pt-6 dark:border-zinc-700">
                  <h3 className="mb-4 text-xl font-bold dark:text-white">
                    Products
                  </h3>

                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16 rounded-xl object-cover"
                        />

                        <div>
                          <p className="font-semibold dark:text-white">
                            {item.title}
                          </p>

                          <p className="text-zinc-500">Qty: {item.quantity}</p>
                        </div>
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
