import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminDashboardPage() {
  const [products, setProducts] = useState([]);

  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [image, setImage] = useState("");

  const [description, setDescription] = useState("");

  const addProductHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/products", {
        title,
        price,
        category,
        image,
        description,
      });

      setProducts([data, ...products]);

      toast.success("Product added");

      setTitle("");

      setPrice("");

      setCategory("");

      setImage("");

      setDescription("");
    } catch (error) {
      toast.error("Failed to add product");

      console.log(error);
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      setProducts(products.filter((item) => item._id !== id));

      toast.success("Product deleted");
    } catch (error) {
      toast.error("Delete failed");

      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

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

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              required
            >
              <option value="">Select Category</option>

              <option value="Fashion">Fashion</option>

              <option value="Electronics">Electronics</option>

              <option value="Furniture">Furniture</option>

              <option value="Accessories">Accessories</option>

              <option value="Beauty">Beauty</option>

              <option value="Travel">Travel</option>
            </select>

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              required
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              key={product._id}
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
                  onClick={() => deleteProductHandler(product._id)}
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
