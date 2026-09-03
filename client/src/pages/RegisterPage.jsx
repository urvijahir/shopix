import { useState } from "react";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";

function RegisterPage() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }
      await axios.post(`${BASE_URL}/api/users/register`, {
        name,
        email,
        password,
      });

      toast.success("Registration successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section className="flex min-h-[calc(100dvh-64px)] items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-100 px-4 py-4 sm:py-6 lg:py-10 dark:from-[#0F0A1F] dark:via-[#18122B] dark:to-[#1F1B33]">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={submitHandler}
        className="w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-5 sm:p-6 lg:p-8 shadow-xl backdrop-blur-xl dark:border-violet-900/40 dark:bg-[#181424]/90"
      >
        <div className="mb-5 lg:mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-full bg-violet-100 text-4xl transition-transform duration-300 hover:scale-110 dark:bg-violet-900/30">
            ✨
          </div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[4px] text-violet-600">
            Join Shopix
          </p>
          <h1 className="mt-2 text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white">
            Create Account
          </h1>

          <p className="mt-3 text-zinc-500 dark:text-zinc-400">
            Start your premium shopping experience.
          </p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 lg:py-4 text-zinc-900 outline-none transition-all duration-300 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 lg:py-4 text-zinc-900 outline-none transition-all duration-300 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 lg:py-4 pr-14 text-zinc-900 outline-none transition-all duration-300 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-violet-600 dark:text-zinc-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 lg:py-4 pr-14 text-zinc-900 outline-none transition-all duration-300 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-violet-900/30"
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-violet-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              required
              className="mt-1 h-5 w-5 rounded border-zinc-300 text-violet-600 accent-violet-600"
            />

            <p className="text-md text-zinc-600 dark:text-zinc-400">
              I agree to the{" "}
              <span className="cursor-pointer font-semibold text-violet-600 hover:underline">
                Terms & Conditions
              </span>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 py-3 lg:py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Your Account..." : "Create Account"}
          </button>

          <div className="mt-3 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="ml-2 cursor-pointer font-semibold text-violet-600 transition hover:text-violet-700 hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </motion.form>
    </section>
  );
}

export default RegisterPage;
