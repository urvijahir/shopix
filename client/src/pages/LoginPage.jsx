import { useState } from "react";

import axios from "axios";

import { useDispatch } from "react-redux";

import { setCredentials } from "../redux/authSlice";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
      );

      dispatch(setCredentials(data));

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");

      console.log(error);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 dark:bg-zinc-950">
      <form
        onSubmit={submitHandler}
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
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-400"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:scale-105"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
