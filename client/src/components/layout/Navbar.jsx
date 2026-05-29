import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { darkMode, toggleTheme } = useTheme();

  const logoutHandler = () => {
    dispatch(logout());

    toast.success("Logged out successfully");
  };

  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white  dark:bg-zinc-950 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-zinc-900  dark:text-white"
        >
          Shopix
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 ">
          <Link
            to="/"
            className="text-sm font-medium dark:text-zinc-200 transition hover:text-black dark:hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-2 rounded-xl px-4 py-2 transition "
          >
            <span className="text-xl">❤️</span>

            <span className="font-medium text-zinc-900 dark:text-white">
              Wishlist
            </span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {wishlistItems.length}
            </span>
          </Link>

          <Link
            to="/cart"
            className="text-sm font-medium dark:text-zinc-200 transition hover:text-black dark:hover:text-white"
          >
            Cart ({cartItems.length})
          </Link>

          {userInfo ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold dark:text-zinc-200">
                {userInfo.name}
              </span>

              <button
                onClick={logoutHandler}
                className="rounded-xl bg-black px-5 py-2  text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-black px-5 py-2 text-white"
            >
              Login
            </Link>
          )}
          <Link
            to="/admin"
            className="text-sm font-medium dark:text-zinc-200 transition hover:text-black dark:hover:text-white"
          >
            Admin
          </Link>

          <button
            onClick={toggleTheme}
            className="rounded-xl border border-zinc-300 px-4 py-2 dark:border-zinc-700 dark:text-white"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
