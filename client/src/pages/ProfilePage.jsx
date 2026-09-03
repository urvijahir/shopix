import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config";
import toast from "react-hot-toast";
import { Heart, Package, ShoppingCart } from "lucide-react";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/orders/my`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userInfo?.token) {
      fetchOrders();
    }
  }, [userInfo]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-12 dark:from-zinc-950 dark:via-zinc-950 dark:to-black sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-violet-100 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-fuchsia-600 to-purple-700 py-10 text-center text-white">
          <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"></div>
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-violet-500 to-fuchsia-600 text-5xl font-bold shadow-2xl">
            {userInfo?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            {userInfo?.name}
          </h1>

          <p className="mt-2 text-lg text-violet-100">{userInfo?.email}</p>

          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
              Member Since: June 2026
            </p>

            <button
              onClick={() => toast("Coming Soon")}
              className="rounded-xl bg-white px-5 py-2 font-semibold text-violet-700 shadow-md transition duration-300 hover:scale-105 hover:bg-violet-100"
            >
              Edit Profile
            </button>
          </div>

          {userInfo?.email === "admin29@gmail.com" && (
            <span className="mt-3 inline-block rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold">
              ADMIN
            </span>
          )}
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-violet-100 bg-violet-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <Heart className="mx-auto mb-3 text-violet-600" size={30} />
            <h3 className="text-4xl font-extrabold text-violet-600 dark:text-violet-400">
              {wishlistItems.length}
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Wishlist Items
            </p>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-violet-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <Package className="mx-auto mb-3 text-violet-600" size={30} />
            <h3 className=" text-4xl font-extrabold text-violet-600 dark:text-violet-400">
              {orders.length}
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Total Orders
            </p>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-violet-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <ShoppingCart className="mx-auto mb-3 text-violet-600" size={30} />
            <h3 className="text-4xl font-extrabold text-violet-600 dark:text-violet-400">
              {cartItems.length}
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Cart Items
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-5 dark:border-zinc-800 dark:bg-zinc-800">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
            Account Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-lg text-zinc-500">Full Name</p>
              <p className="font-semibold text-zinc-900 dark:text-white">
                {userInfo?.name}
              </p>
            </div>

            <div>
              <p className="text-lg text-zinc-500">Email Address</p>
              <p className="font-semibold text-zinc-900 dark:text-white">
                {userInfo?.email}
              </p>
            </div>

            <div>
              <p className="text-lg text-zinc-500">Member Status</p>
              <p className="font-semibold text-green-600">Verified User</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/orders"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-center font-semibold text-white transition hover:scale-105 hover:shadow-lg"
            >
              My Orders
            </Link>

            <Link
              to="/wishlist"
              className="rounded-xl border border-violet-300 px-6 py-3 text-center font-semibold text-violet-600 transition hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:hover:bg-zinc-800"
            >
              My Wishlist
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Recent Orders
            </h2>

            <Link
              to="/orders"
              className="text-sm font-semibold text-violet-600 transition hover:text-fuchsia-600"
            >
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
                  className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-6"
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
                    {/* Order */}
                    <div className="min-w-0">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Order
                      </p>

                      <p className="mt-1 truncate font-semibold text-zinc-900 dark:text-white">
                        #{order._id.slice(-6)}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="min-w-0">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white sm:text-base">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="min-w-0">
                      <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                        Status
                      </p>

                      <span
                        className={`inline-flex max-w-full rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="min-w-0">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-violet-600 dark:text-violet-400">
                        ₹{order.totalPrice.toLocaleString("en-IN")}
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
