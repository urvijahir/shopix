import { useState } from "react";

import axios from "axios";

import { useDispatch } from "react-redux";

import { setCredentials } from "../redux/authSlice";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";

function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

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

      dispatch(setCredentials(data));

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
    <section className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 dark:bg-zinc-950">
      <form
        onSubmit={submitHandler}
        autoComplete="off"
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-900"
      >
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-white">
          Login
        </h1>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:scale-105"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="mt-6 text-center text-zinc-600 dark:text-zinc-300">
            Don’t have an account?
            <span
              onClick={() => navigate("/register")}
              className="ml-2 cursor-pointer font-semibold text-black dark:text-white"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
