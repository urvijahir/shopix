import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

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
    <section className="min-h-screen bg-zinc-100 px-4 py-10 dark:bg-zinc-950 sm:px-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-zinc-900">
        <div className="bg-black py-5 text-center text-white">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-zinc-900 text-4xl font-bold text-white">
            {userInfo?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-2 text-3xl font-bold">{userInfo?.name}</h1>
          <p className="mt-1 text-zinc-300">{userInfo?.email}</p>

          <p className="mt-1 text-sm text-zinc-400">Member Since: June 2026</p>

          {userInfo?.email === "admin29@gmail.com" && (
            <span className="mt-3 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold">
              ADMIN
            </span>
          )}
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-zinc-100 p-3 text-center dark:bg-zinc-800">
            <h3 className="text-2xl font-bold dark:text-white">
              {wishlistItems.length}
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Wishlist Items
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-100 p-3 text-center dark:bg-zinc-800">
            <h3 className="text-2xl font-bold dark:text-white">
              {orders.length}
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Total Orders
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-100 p-3 text-center dark:bg-zinc-800">
            <h3 className="text-2xl font-bold dark:text-white">
              {cartItems.length}
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Cart Items</p>
          </div>
        </div>

        <div className="border-t border-zinc-200 p-6 dark:border-zinc-800 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
            Account Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500">Full Name</p>
              <p className="font-semibold text-zinc-900 dark:text-white">
                {userInfo?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Email Address</p>
              <p className="font-semibold text-zinc-900 dark:text-white">
                {userInfo?.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Member Status</p>
              <p className="font-semibold text-green-600">Verified User</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/orders"
              className="rounded-xl bg-black px-6 py-3 text-center font-semibold text-white dark:bg-white dark:text-black"
            >
              My Orders
            </Link>

            <Link
              to="/wishlist"
              className="rounded-xl border border-zinc-300 px-6 py-3 text-center font-semibold text-zinc-900 dark:border-zinc-700 dark:text-white"
            >
              My Wishlist
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-200 p-6 dark:border-zinc-800 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Recent Orders
            </h2>

            <Link to="/orders" className="text-sm font-semibold text-blue-600">
              View All
            </Link>
          </div>

          {orders.length === 0 ? (
            <p className="rounded-2xl bg-zinc-100 p-6 text-center text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              No orders yet.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order._id}
                  className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-700"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-zinc-500">Order</p>
                      <p className="font-semibold dark:text-white">
                        #{order._id.slice(-6)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Date</p>
                      <p className="font-semibold dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Total</p>
                      <p className="font-bold text-green-600">
                        ${order.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
