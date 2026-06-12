import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { darkMode, toggleTheme } = useTheme();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full md:border-b border-zinc-200 dark:border-zinc-800 bg-white backdrop-blur-md dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white"
          >
            Shopix
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="text-sm font-medium transition hover:text-black dark:text-zinc-200 dark:hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <FaHeart className="text-red-500" />

              <span className="font-medium text-zinc-900 dark:text-white">
                Wishlist
              </span>

              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {wishlistItems.length}
              </span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-sm font-medium transition hover:text-black dark:text-zinc-200 dark:hover:text-white"
            >
              <FaShoppingCart />
              <span>Cart ({cartItems.length})</span>
            </Link>

            <Link
              to="/orders"
              className="text-sm font-medium transition hover:text-black dark:text-zinc-200 dark:hover:text-white"
            >
              Orders
            </Link>

            {userInfo?.email === "admin29@gmail.com" && (
              <Link
                to="/admin"
                className="text-sm font-medium transition hover:text-black dark:text-zinc-200 dark:hover:text-white"
              >
                Admin
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="rounded-xl border border-zinc-300 px-3 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {userInfo ? (
              <>
                <span className="font-semibold dark:text-zinc-200">
                  {userInfo.name}
                </span>

                <button
                  onClick={logoutHandler}
                  className="rounded-xl bg-black px-5 py-2 text-white transition hover:opacity-90"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-xl bg-black px-5 py-2 text-white transition hover:opacity-90"
              >
                Login
              </Link>
            )}
          </div>
          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/wishlist"
              className="text-sm font-medium text-zinc-900 dark:text-white"
            >
              ❤️ {wishlistItems.length}
            </Link>

            <Link
              to="/cart"
              className="text-sm font-medium text-zinc-900 dark:text-white"
            >
              🛒 {cartItems.length}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-3xl dark:text-white"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 flex flex-col gap-3 border-t border-zinc-200 dark:border-zinc-800  pt-4 md:hidden text-zinc-900 dark:text-white">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Home
            </Link>

            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Orders
            </Link>

            <button
              onClick={toggleTheme}
              className="rounded-xl border border-zinc-300 px-4 py-2 dark:border-zinc-700 dark:text-white"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {userInfo?.email === "admin29@gmail.com" && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Admin
              </Link>
            )}

            {userInfo ? (
              <>
                <span className="font-semibold dark:text-white">
                  {userInfo.name}
                </span>

                <button
                  onClick={logoutHandler}
                  className="rounded-xl bg-black px-5 py-2 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-black px-5 py-2 text-center text-white dark:bg-white dark:text-black"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
