import { useParams } from "react-router-dom";
import products from "../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const product = products.find((item) => item.id === Number(id));

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="w-full rounded-3xl object-cover shadow-xl"
        />
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {product.category}
        </p>

        <h1 className="mt-3 text-5xl font-bold text-zinc-900">
          {product.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-600">
          Premium quality product designed for modern lifestyle and comfort.
        </p>

        <div className="mt-8 flex items-center gap-6">
          <span className="text-4xl font-bold text-zinc-900">
            ${product.price}
          </span>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:scale-105"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
