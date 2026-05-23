import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

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

          {userInfo ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-zinc-800">
                {userInfo.name}
              </span>

              <button
                onClick={logoutHandler}
                className="rounded-xl bg-black px-5 py-2 text-white"
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
