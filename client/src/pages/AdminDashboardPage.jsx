import { useState } from "react";

import productsData from "../data/products";

function AdminDashboardPage() {
  const [products, setProducts] = useState(productsData);

  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [image, setImage] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      category,
      image,
    };

    setProducts([newProduct, ...products]);

    setTitle("");

    setPrice("");

    setCategory("");

    setImage("");
  };

  const deleteProductHandler = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  return (
    <section className="min-h-screen bg-zinc-100 px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-5xl font-bold text-zinc-900 dark:text-white">
          Admin Dashboard
        </h1>

        {/* FORM */}
        <div className="mb-12 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
            Add Product
          </h2>

          <form
            onSubmit={addProductHandler}
            className="grid gap-6 md:grid-cols-2"
          >
            <input
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              required
            />

            <button
              type="submit"
              className="rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* PRODUCTS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-zinc-900"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <p className="text-sm font-semibold text-blue-600">
                  {product.category}
                </p>

                <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white">
                  {product.title}
                </h2>

                <p className="mt-4 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                  ${product.price}
                </p>

                <button
                  onClick={() => deleteProductHandler(product.id)}
                  className="mt-6 rounded-2xl bg-red-500 px-6 py-3 text-white transition hover:bg-red-600"
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
