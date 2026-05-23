import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-zinc-900"
        >
          Shopix
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-zinc-700 transition hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="text-sm font-medium text-zinc-700 transition hover:text-black"
          >
            Cart ({cartItems.length})
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:scale-105"
          >
            {userInfo ? userInfo.name : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
