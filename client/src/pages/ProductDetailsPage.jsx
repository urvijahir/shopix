import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

function ProductDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");

        const foundProduct = data.find((item) => item.id === Number(id));

        setProduct(foundProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="py-20 text-center text-2xl font-bold">Loading...</div>
    );
  }
  return (
    <section className="mx-auto grid max-w-7xl gap-12 bg-white px-6 py-16 dark:bg-zinc-950 md:grid-cols-2">
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

        <h1 className="mt-3 text-5xl font-bold text-zinc-900 dark:text-white">
          {product.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Premium quality product designed for modern lifestyle and comfort.
        </p>

        <div className="mt-8 flex items-center gap-6">
          <span className="text-4xl font-bold text-zinc-900 dark:text-white">
            ${product.price}
          </span>

          <button
            onClick={() => {
              dispatch(
                addToCart({
                  ...product,
                  quantity: 1,
                }),
              );

              toast.success("Product added to cart");
            }}
            className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:scale-105 dark:bg-white dark:text-black"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
