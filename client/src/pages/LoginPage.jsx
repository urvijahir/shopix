import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import axios from "axios";

import { useDispatch } from "react-redux";

import { setCredentials } from "../redux/authSlice";
import { loadCartForUser } from "../redux/cartSlice";
import { loadWishlistForUser } from "../redux/wishlistSlice";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      // Save logged-in user
      dispatch(setCredentials(data));

      // Load this user's saved cart
      dispatch(loadCartForUser(data._id));

      // Load this user's saved wishlist
      dispatch(loadWishlistForUser(data._id));

      toast.success("Login successful");
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section className="flex min-h-[calc(100dvh-64px)] items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-100 px-4 py-6 sm:py-6 lg:py-10 md:py-8 dark:from-[#0F0A1F] dark:via-[#18122B] dark:to-[#1F1B33]">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={submitHandler}
        autoComplete="off"
        className="w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-5 sm:p-6 lg:p-8 shadow-xl backdrop-blur-xl dark:border-violet-900/40 dark:bg-[#181424]/90"
      >
        <div className="mb-5 lg:mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-full bg-violet-100 transition-transform duration-300 hover:scale-110 dark:bg-violet-900/30">
            <ShoppingBag
              size={32}
              className="text-violet-600 dark:text-violet-400"
            />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[4px] text-violet-600">
            Welcome Back
          </p>

          <h1 className="mt-2 text-3xl lg:text-4xl  font-extrabold text-zinc-900 dark:text-white">
            Login to Shopix
          </h1>

          <p className="mt-3 text-zinc-500 dark:text-zinc-400">
            Sign in to continue shopping.
          </p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 lg:py-4 text-zinc-900 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 lg:py-4 pr-14 text-zinc-900 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-violet-600 dark:text-zinc-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 py-3 lg:py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing You In..." : "Login"}
          </button>

          <p className="mb-4 text-center text-zinc-600 dark:text-zinc-300">
            Don’t have an account?
            <span
              onClick={() => navigate("/register")}
              className="ml-2 cursor-pointer font-semibold text-violet-600 dark:text-violet-600"
            >
              Register here
            </span>
          </p>
        </div>
      </motion.form>
    </section>
  );
}

export default LoginPage;
