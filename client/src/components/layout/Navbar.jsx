import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";
import { setSearch } from "../../redux/searchSlice";
import { useTheme } from "../../context/ThemeContext";

import {
  FaHeart,
  FaShoppingCart,
  FaBox,
  FaHome,
  FaList,
  FaUser,
  FaMoon,
  FaSun,
  FaTools,
  FaSignOutAlt,
} from "react-icons/fa";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchText = useSelector((state) => state.search.search);
  const suggestions =
    searchText.trim() === ""
      ? []
      : products.filter((product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase()),
        );
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  const handleSuggestionClick = (id) => {
    dispatch(setSearch(""));
    navigate(`/product/${id}`);
  };

  const handleCategoryClick = () => {
    setIsOpen(false);

    if (location.pathname === "/") {
      setTimeout(() => {
        document
          .getElementById("categories")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate("/#categories");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex w-44 flex-shrink-0 items-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-3xl font-extrabold text-transparent"
            >
              Shopix
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden flex-1 items-center lg:flex">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="rounded-xl px-4 py-2 font-medium text-zinc-700 transition hover:bg-violet-100 hover:text-violet-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-violet-400"
              >
                Home
              </Link>
              <button
                onClick={() => {
                  if (location.pathname === "/") {
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/#categories");
                  }
                }}
                className="rounded-xl px-4 py-2 font-medium text-zinc-700 transition hover:bg-violet-100 hover:text-violet-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-violet-400"
              >
                Categories
              </button>
            </div>

            <div className="mx-8 flex max-w-md flex-1">
              <div className="relative w-56 xl:w-80">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchText}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-5 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
                />

                {suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                    {suggestions.slice(0, 5).map((product) => (
                      <button
                        key={product._id}
                        onClick={() => handleSuggestionClick(product._id)}
                        className="flex w-full items-center gap-4 border-b border-zinc-100 p-4 text-left transition hover:bg-violet-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-14 w-14 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <p className="font-semibold text-zinc-900 dark:text-white">
                            {product.title}
                          </p>

                          <p className="text-sm text-violet-600">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Link
                to="/wishlist"
                className="relative rounded-xl p-3 transition hover:bg-violet-100 dark:hover:bg-zinc-800"
              >
                <FaHeart className="text-red-500" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                  {wishlistItems.length}
                </span>
              </Link>
              <Link
                to="/cart"
                className="relative rounded-xl p-3 transition hover:bg-violet-100 dark:hover:bg-zinc-800"
              >
                <FaShoppingCart className=" text-violet-600 dark:text-violet-400" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                  {cartItems.length}
                </span>
              </Link>

              <Link
                to="/orders"
                className="relative rounded-xl p-3 transition hover:bg-violet-100 dark:hover:bg-zinc-800"
              >
                <FaBox className="text-violet-600 dark:text-violet-400" />
              </Link>

              <button
                onClick={toggleTheme}
                className="rounded-xl text-lg border border-zinc-300 p-3 transition hover:bg-violet-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {darkMode ? (
                  <FaSun className="text-yellow-400 text-lg" />
                ) : (
                  <FaMoon className="text-zinc-700 text-lg" />
                )}
              </button>
            </div>

            {userInfo ? (
              <>
                <div className="ml-6 flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-violet-100 dark:hover:bg-zinc-800"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-bold text-white shadow-md">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="hidden xl:block">
                      <p className="font-semibold text-zinc-900 dark:text-white">
                        {userInfo.name}
                      </p>
                    </div>
                  </Link>

                  {userInfo.email === "admin29@gmail.com" && (
                    <Link
                      to="/admin"
                      className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:scale-105"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-semibold text-white transition hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="ml-4">
                <Link
                  to="/login"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Tablet Navbar */}
          <div className="hidden md:flex lg:hidden flex-1 items-center justify-end gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="w-44 md:w-52 rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-2 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
            {suggestions.length > 0 && !isOpen && (
              <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                {suggestions.slice(0, 5).map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleSuggestionClick(product._id)}
                    className="flex w-full items-center gap-4 border-b border-zinc-100 p-4 text-left transition hover:bg-violet-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-zinc-900 dark:text-white">
                        {product.title}
                      </p>

                      <p className="text-sm text-violet-600">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <Link to="/wishlist" className="relative p-2">
              <FaHeart className="text-red-500 text-xl" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] text-white">
                {wishlistItems.length}
              </span>
            </Link>

            <Link to="/cart" className="relative p-2">
              <FaShoppingCart className="text-xl text-violet-600 dark:text-violet-400" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] text-white">
                {cartItems.length}
              </span>
            </Link>

            <button
              onClick={toggleTheme}
              className="hidden md:flex lg:hidden rounded-xl border border-zinc-300 p-2 dark:border-zinc-700"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-lg" />
              ) : (
                <FaMoon className="text-zinc-700 text-lg" />
              )}
            </button>

            <button
              onClick={() => {
                dispatch(setSearch(""));
                setIsOpen(!isOpen);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-3xl text-zinc-700 transition hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
            >
              ☰
            </button>
          </div>
        </div>
        {/* Mobile Navbar */}
        <div className="flex md:hidden flex-1 items-center justify-end gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="w-44 md:w-52 rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-2 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
          {suggestions.length > 0 && !isOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
              {suggestions.slice(0, 5).map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleSuggestionClick(product._id)}
                  className="flex w-full items-center gap-4 border-b border-zinc-100 p-4 text-left transition hover:bg-violet-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      {product.title}
                    </p>

                    <p className="text-sm text-violet-600">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <Link to="/wishlist" className="relative p-2">
            <FaHeart className="text-red-500 text-xl" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] text-white">
              {wishlistItems.length}
            </span>
          </Link>

          <Link to="/cart" className="relative p-2">
            <FaShoppingCart className="text-violet-600 text-xl" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] text-white">
              {cartItems.length}
            </span>
          </Link>

          <button
            onClick={() => {
              dispatch(setSearch(""));
              setIsOpen(!isOpen);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-3xl dark:text-white"
          >
            ☰
          </button>
        </div>

        {/* Hamburger Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-[999999] flex h-[100dvh] w-full flex-col overflow-hidden bg-white dark:bg-zinc-950 lg:hidden">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-3xl font-extrabold text-transparent"
              >
                Shopix
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-3xl text-zinc-700 dark:text-white"
              >
                ×
              </button>
            </div>

            {/*  Menu Content */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-zinc-900 dark:text-white">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 rounded-xl px-3 py-3.5 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <FaHome className="text-violet-600" />
                Home
              </Link>

              <button
                onClick={handleCategoryClick}
                className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <FaList className="text-violet-600" />
                Categories
              </button>

              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 rounded-xl px-3 py-3.5 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <FaBox className="text-violet-600" />
                Orders
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 rounded-xl px-3 py-3.5 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <FaHeart className="text-red-500" />
                Wishlist
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 rounded-xl px-3 py-3.5 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <FaShoppingCart className="text-violet-600" />
                Cart
              </Link>

              {/* Theme */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="mt-3 flex w-full items-center gap-4 rounded-xl border border-zinc-300 px-4 py-3.5 font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {darkMode ? (
                  <>
                    <FaSun className="text-lg text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="text-lg text-zinc-700 dark:text-zinc-300" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {/* Admin */}
              {userInfo?.email === "admin29@gmail.com" && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex items-center gap-4 rounded-xl px-3 py-3.5 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <FaTools className="text-violet-600" />
                  Admin Panel
                </Link>
              )}

              {/* Logged-in User */}
              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 flex items-center gap-4 rounded-2xl bg-zinc-100 p-4 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-lg font-bold text-white">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <FaUser className="text-violet-600" />
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          View Profile
                        </p>
                      </div>

                      <p className="font-semibold text-zinc-900 dark:text-white">
                        {userInfo.name}
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={logoutHandler}
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 font-semibold text-white"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 font-semibold text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
