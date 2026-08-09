import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import ProductReviews from "../components/product/ProductReviews";
import ProductCard from "../components/product/ProductCard";
import { BASE_URL } from "../config";
import { addToWishlist } from "../redux/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setProduct(null);
        setRelatedProducts([]);
        setSelectedColor("");
        setSelectedSize("");
        setDisplayImage("");
        setQuantity(1);
        window.scrollTo(0, 0);

        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);

        setProduct(data);

        const firstColorImage = data.colorImages?.[0];

        if (firstColorImage) {
          setDisplayImage(firstColorImage.image);
          setSelectedColor(firstColorImage.color);
        } else {
          setDisplayImage(data.image);

          if (data.colors?.length > 0) {
            setSelectedColor(data.colors[0]);
          }
        }

        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        const allProductsRes = await axios.get(`${BASE_URL}/api/products`);

        const related = allProductsRes.data
          .filter(
            (item) => item.category === data.category && item._id !== data._id,
          )
          .slice(0, 4);

        setRelatedProducts(related);
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
        quantity,
        selectedColor,
        selectedSize,
      }),
    );

    toast.success("Product added to cart");
  };

  const addToWishlistHandler = () => {
    const alreadyExists = wishlistItems.some(
      (item) => item._id === product._id,
    );

    if (alreadyExists) {
      toast("Already in wishlist");
      return;
    }

    dispatch(addToWishlist(product));
    toast.success("Added to wishlist");
  };

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-black"></div>
      </div>
    );
  }

  const gallery = product
    ? [
        product.colorImages?.[0]?.image || product.image,
        ...(product.galleryImages || []),
      ].filter((img) => img && img.startsWith("http"))
    : [];

  return (
    <section className="bg-gradient-to-b from-white via-violet-50/30 to-white px-4 py-12 dark:from-zinc-950 dark:via-[#171225] dark:to-zinc-950 sm:px-6 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6 lg:flex-row">
          {gallery.length > 1 && (
            <div className="order-2 flex justify-center gap-3 lg:order-1 lg:flex-col">
              {gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setDisplayImage(img)}
                  className={`overflow-hidden rounded-2xl border-2 p-1 transition-all duration-300 ${
                    displayImage === img
                      ? "border-violet-600 shadow-lg"
                      : "border-zinc-200 hover:border-violet-400 dark:border-zinc-700"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                </button>
              ))}
            </div>
          )}
          <div className="order-1 flex aspect-square flex-1 items-center justify-center rounded-3xl border border-zinc-200 bg-white p-10 shadow-lg dark:border-zinc-800 dark:bg-[#181424]">
            <img
              src={displayImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">
            {product.category}
          </p>

          <h1 className="mt-4 text-4xl font-bold text-zinc-900 dark:text-white md:text-5xl">
            {product.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            {product.description ||
              "Premium quality product designed for modern lifestyle and comfort."}
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
          {/* Price */}
          <div className="mt-10 ">
            <h2 className="text-5xl font-extrabold text-zinc-900 dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-lg text-zinc-400 line-through">
                MRP ₹{Math.round(product.price * 1.25).toLocaleString("en-IN")}
              </span>

              <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                20% OFF
              </span>
            </div>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Inclusive of all taxes
            </p>
          </div>

          {product.colors?.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                Color :
              </h3>

              <div className="flex flex-wrap gap-3">
                {(product.colorImages?.length > 0
                  ? product.colorImages.map((item) => item.color)
                  : product.colors
                ).map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);

                      const matchedImage = product.colorImages?.find(
                        (item) =>
                          item.color.trim().toLowerCase() ===
                          color.trim().toLowerCase(),
                      );

                      setDisplayImage(matchedImage?.image || product.image);
                    }}
                    className={`rounded-2xl border-2 px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                      selectedColor === color
                        ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-300/30"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-violet-400 dark:border-zinc-700 dark:bg-[#181424] dark:text-zinc-300"
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
                Size :
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-12 min-w-12 items-center justify-center rounded-2xl border-2 px-5 font-semibold transition-all duration-300 ${
                      selectedSize === size
                        ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-300/30"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-violet-400 dark:border-zinc-700 dark:bg-[#181424] dark:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Quantity
            </h3>

            <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm dark:border-violet-800 dark:bg-[#221D38]">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-5 py-3 text-xl font-semibold text-zinc-800 transition hover:bg-violet-100 dark:text-white dark:hover:bg-violet-900/30"
              >
                -
              </button>

              <span className="min-w-14 text-center text-lg font-semibold text-zinc-900 dark:text-white">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-5 py-3 text-xl font-semibold text-zinc-800 transition hover:bg-violet-100 dark:text-white dark:hover:bg-violet-900/30"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={addToCartHandler}
              disabled={product.stock === 0}
              className="flex-1 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {product.stock === 0 ? "Out Of Stock" : "Add To Cart"}
            </button>

            <button
              onClick={addToWishlistHandler}
              className="flex items-center justify-center gap-3 rounded-2xl border border-violet-200 bg-white px-8 py-4 font-semibold text-zinc-800 transition-all duration-300 hover:border-violet-600 hover:text-violet-600 dark:border-violet-800 dark:bg-[#221D38] dark:text-white"
            >
              <FaHeart className="text-violet-500" />
              Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-3">
        {/* Free Shipping */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-4 dark:border-zinc-800 sm:border-b-0 sm:border-r">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10">
            <Truck size={20} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Free Shipping
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Above ₹999
            </p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-4 dark:border-zinc-800 sm:border-b-0 sm:border-r">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Secure Payment
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              100% Protected
            </p>
          </div>
        </div>

        {/* Easy Returns */}
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10">
            <RotateCcw size={20} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Easy Returns
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              7-Day Return
            </p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mx-auto mt-20 max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Related Products
            </p>

            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              You may also like
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <ProductReviews product={product} setProduct={setProduct} />
      </div>
    </section>
  );
}

export default ProductDetailsPage;
