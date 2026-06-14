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
    <div className="mt-20">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Reviews
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Customer Reviews
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-50 px-5 py-3 text-zinc-900">
          <span className="font-bold text-yellow-500">
            ⭐ {product.rating?.toFixed(1) || 0}
          </span>

          <span className="ml-2 text-sm text-zinc-600">
            ({product.numReviews || 0} reviews)
          </span>
        </div>
      </div>

      <form
        onSubmit={submitHandler}
        className="mb-10 rounded-3xl bg-white p-5 shadow-sm dark:bg-zinc-900 sm:p-8"
      >
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            required
          />

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            required
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>

          <button
            type="submit"
            className="rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:scale-105 dark:bg-white dark:text-black"
          >
            Submit Review
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {product.reviews?.length > 0 ? (
          product.reviews.map((review) => (
            <div
              key={review._id || review.createdAt}
              className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {review.name}
                </h3>

                <span className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </span>
              </div>

              <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="rounded-3xl bg-white p-6 text-zinc-500 dark:bg-zinc-900">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
