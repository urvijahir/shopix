import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import ProductReviews from "../components/product/ProductReviews";
import { BASE_URL } from "../config";
function ProductDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-black"></div>
      </div>
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

        <h1 className="mt-3 text-3xl font-bold md:text-5xl text-zinc-900 dark:text-white">
          {product.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Premium quality product designed for modern lifestyle and comfort.
        </p>

        <p className="font-medium text-green-600">✓ In Stock</p>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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
      <ProductReviews />
    </section>
  );
}

export default ProductDetailsPage;
