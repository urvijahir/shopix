import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 bg-white dark:bg-zinc-950">
      <h1 className="mb-10 text-4xl font-bold text-zinc-900 dark:text-white">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-zinc-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-6 rounded-3xl bg-white  dark:bg-zinc-900 p-6 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-zinc-500">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="rounded-lg border px-4 py-2"
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="rounded-lg border px-4 py-2"
                >
                  +
                </button>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="rounded-xl bg-red-500 px-4 py-2 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-10 flex items-center justify-between rounded-3xl bg-black p-6 text-white">
            <h2 className="text-2xl font-bold">Total</h2>

            <span className="text-3xl font-bold">${totalPrice}</span>
            <Link
              to="/checkout"
              className="mt-6 inline-block rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:scale-105"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
