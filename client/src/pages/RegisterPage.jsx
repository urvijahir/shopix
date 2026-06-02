import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";

function RegisterPage() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/users`, {
        name,
        email,
        password,
      });

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");

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
          Register
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:scale-105"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default RegisterPage;
