import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import ProductReviews from "../components/product/ProductReviews";
import { BASE_URL } from "../config";
import { addToWishlist } from "../redux/wishlistSlice";
import { FaHeart } from "react-icons/fa";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const { wishlistItems } = useSelector((state) => state.wishlist);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(data);
        setDisplayImage(data.image);

        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }

        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        image: displayImage,
        quantity: 1,
        selectedColor,
        selectedSize,
      }),
    );

    toast.success("Product added to cart");
  };

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-black"></div>
      </div>
    );
  }

  return (
    <section className="bg-white px-4 py-10 dark:bg-zinc-950 sm:px-6 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div>
          <img
            src={displayImage}
            alt={product.title}
            className="mx-auto h-72 w-full max-w-md rounded-3xl object-contain shadow-xl sm:h-96 md:h-[500px]"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white md:text-5xl">
            {product.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Premium quality product designed for modern lifestyle and comfort.
          </p>

          <div className="mt-4">
            {product.stock > 0 ? (
              <p className="font-medium text-green-600">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="font-medium text-red-500">Out of Stock</p>
            )}
          </div>

          {product.colors?.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 font-semibold text-zinc-900 dark:text-white">
                Select Color
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);

                      const matchedImage = product.colorImages?.find(
                        (item) =>
                          item.color.toLowerCase() === color.toLowerCase(),
                      );

                      setDisplayImage(matchedImage?.image || product.image);
                    }}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                      selectedColor === color
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-zinc-300 text-zinc-700 hover:border-black dark:border-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 font-semibold text-zinc-900 dark:text-white">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-11 min-w-11 items-center justify-center rounded-xl border px-4 font-semibold transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-zinc-300 text-zinc-700 hover:border-black dark:border-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="text-4xl font-bold text-zinc-900 dark:text-white">
              ${product.price}
            </span>

            <button
              onClick={addToCartHandler}
              disabled={product.stock === 0}
              className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-white dark:text-black"
            >
              {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
            </button>

            <button
              onClick={() => {
                const alreadyExists = wishlistItems.some(
                  (item) => item._id === product._id,
                );

                if (alreadyExists) {
                  toast("Already in wishlist");
                  return;
                }

                dispatch(addToWishlist(product));
                toast.success("Added to wishlist");
              }}
              className="flex items-center gap-2 rounded-xl border border-zinc-300 px-6 py-3 font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              <FaHeart className="text-red-500" />
              Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <ProductReviews />
      </div>
    </section>
  );
}

export default ProductDetailsPage;
