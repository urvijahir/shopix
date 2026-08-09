import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";

function ProductReviews({ product, setProduct }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/products/${product._id}/reviews`,
        {
          name,
          rating,
          comment,
        },
      );

      setProduct({
        ...product,
        reviews: data.reviews,
        rating: data.rating,
        numReviews: data.numReviews,
      });

      toast.success("Review submitted");

      setName("");
      setComment("");
      setRating(5);
    } catch (error) {
      toast.error("Review failed");
      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[3px] text-violet-600">
            Reviews
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Customer Reviews
          </h2>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            See what customers think about this product.
          </p>
        </div>

        {/* Rating */}
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-4 text-center dark:border-yellow-500/20 dark:bg-yellow-500/10">
          <div className="text-2xl font-bold text-yellow-500">
            ⭐ {product.rating?.toFixed(1) || "0.0"}
          </div>

          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {product.numReviews || 0}{" "}
            {product.numReviews === 1 ? "Review" : "Reviews"}
          </p>
        </div>
      </div>

      {/* Review Form */}
      <form
        onSubmit={submitHandler}
        className="mb-10 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8"
      >
        <h3 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
          Write a Review
        </h3>

        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          Share your experience with this product.
        </p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-violet-900/30"
            required
          />

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full resize-none rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-violet-900/30"
            required
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full cursor-pointer rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:ring-violet-900/30"
          >
            <option value={5}>⭐⭐⭐⭐⭐ — Excellent</option>
            <option value={4}>⭐⭐⭐⭐ — Very Good</option>
            <option value={3}>⭐⭐⭐ — Good</option>
            <option value={2}>⭐⭐ — Fair</option>
            <option value={1}>⭐ — Poor</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/30 sm:w-auto"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* Review List */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
            All Reviews
          </h3>

          <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            {product.numReviews || 0}
          </span>
        </div>

        <div className="space-y-5">
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <div
                key={review._id || review.createdAt || index}
                className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    {/* Review Avatar */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-lg font-bold text-white">
                      {review.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white">
                        {review.name}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Verified Customer Review
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-zinc-300 dark:text-zinc-700"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-5 leading-7 text-zinc-600 dark:text-zinc-300">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
              <div className="text-4xl">💬</div>

              <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
                No reviews yet
              </h3>

              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Be the first customer to share your experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
