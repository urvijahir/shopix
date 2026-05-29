import { useState } from "react";

function ProductReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John",
      rating: 5,
      comment: "Amazing quality product!",
    },

    {
      id: 2,
      name: "Sarah",
      rating: 4,
      comment: "Very stylish and premium.",
    },
  ]);

  const [name, setName] = useState("");

  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(5);

  const submitHandler = (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      name,
      rating,
      comment,
    };

    setReviews([newReview, ...reviews]);

    setName("");

    setComment("");

    setRating(5);
  };

  return (
    <div className="mt-20">
      {/* TITLE */}
      <h2 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-white">
        Customer Reviews
      </h2>

      {/* FORM */}
      <form
        onSubmit={submitHandler}
        className="mb-10 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900"
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
            className="rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:scale-105"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* REVIEWS */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
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
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;
