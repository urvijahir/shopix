function Button({ children }) {
  return (
    <button className="rounded-xl bg-black px-6 py-3 font-medium text-white transition duration-300 hover:scale-105 hover:bg-zinc-800">
      {children}
    </button>
  );
}

export default Button;
