import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../config";

function AdminDashboardPage() {
  const [products, setProducts] = useState([]);

  const [editingProductId, setEditingProductId] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [galleryImages, setGalleryImages] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [stock, setStock] = useState("");

  const [colorImages, setColorImages] = useState([{ color: "", image: "" }]);

  const resetForm = () => {
    setEditingProductId(null);
    setTitle("");
    setPrice("");
    setCategory("");
    setImage("");
    setGalleryImages("");
    setDescription("");
    setColors("");
    setSizes("");
    setStock("");
    setColorImages([{ color: "", image: "" }]);
  };

  const addColorImageField = () => {
    setColorImages([...colorImages, { color: "", image: "" }]);
  };

  const updateColorImageField = (index, field, value) => {
    const updated = [...colorImages];
    updated[index][field] = value;
    setColorImages(updated);
  };

  const removeColorImageField = (index) => {
    setColorImages(colorImages.filter((_, i) => i !== index));
  };

  const getFormData = () => {
    const colorArray = colors
      .split(",")
      .map((color) => color.trim())
      .filter((color) => color !== "");

    const sizeArray = sizes
      .split(",")
      .map((size) => size.trim())
      .filter((size) => size !== "");

    const validColorImages = colorImages.filter(
      (item) => item.color.trim() !== "" && item.image.trim() !== "",
    );

    const galleryArray = galleryImages
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img !== "");

    return {
      title,
      price: Number(price),
      category,
      image,
      galleryImages: galleryArray,
      description,
      colors: colorArray,
      sizes: sizeArray,
      stock: Number(stock),
      colorImages: validColorImages,
    };
  };

  const submitProductHandler = async (e) => {
    e.preventDefault();

    try {
      if (editingProductId) {
        const { data } = await axios.put(
          `${BASE_URL}/api/products/${editingProductId}`,
          getFormData(),
        );

        setProducts(
          products.map((product) =>
            product._id === editingProductId ? data : product,
          ),
        );

        toast.success("Product updated");
      } else {
        const { data } = await axios.post(
          `${BASE_URL}/api/products`,
          getFormData(),
        );

        setProducts([data, ...products]);

        toast.success("Product added");
      }

      resetForm();
    } catch (error) {
      toast.error(editingProductId ? "Update failed" : "Failed to add product");
      console.log(error);
    }
  };

  const editProductHandler = (product) => {
    setEditingProductId(product._id);

    setTitle(product.title || "");
    setPrice(product.price || "");
    setCategory(product.category || "");
    setImage(product.image || "");
    setGalleryImages(product.galleryImages?.join(", ") || "");
    setDescription(product.description || "");
    setColors(product.colors?.join(", ") || "");
    setSizes(product.sizes?.join(", ") || "");
    setStock(product.stock || "");

    setColorImages(
      product.colorImages?.length > 0
        ? product.colorImages
        : [{ color: "", image: "" }],
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProductHandler = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);

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
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="min-h-screen bg-zinc-100 px-4 py-10 dark:bg-zinc-950 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-3xl font-bold text-zinc-900 dark:text-white sm:text-5xl">
          Admin Dashboard
        </h1>

        <div className="mb-12 rounded-3xl bg-white p-5 shadow-sm dark:bg-zinc-900 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            {editingProductId ? "Edit Product" : "Add Product"}
          </h2>

          <form
            onSubmit={submitProductHandler}
            className="grid gap-5 md:grid-cols-2"
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
              type="number"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              required
            />

            <input
              type="text"
              placeholder="Colors e.g. Red, Blue, Black"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />

            <input
              type="text"
              placeholder="Sizes e.g. S, M, L, XL"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />

            <input
              type="text"
              placeholder="Main Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white md:col-span-2"
              required
            />

            <input
              type="text"
              placeholder="Gallery Images URLs (comma separated)"
              value={galleryImages}
              onChange={(e) => setGalleryImages(e.target.value)}
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white md:col-span-2"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-4 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white md:col-span-2"
              required
            />

            <div className="md:col-span-2">
              <h3 className="mb-3 font-semibold text-zinc-900 dark:text-white">
                Color Images
              </h3>

              <div className="space-y-4">
                {colorImages.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700 md:grid-cols-2"
                  >
                    <input
                      type="text"
                      placeholder="Color name e.g. Red"
                      value={item.color}
                      onChange={(e) =>
                        updateColorImageField(index, "color", e.target.value)
                      }
                      className="rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                    />

                    <input
                      type="text"
                      placeholder="Image URL for this color"
                      value={item.image}
                      onChange={(e) =>
                        updateColorImageField(index, "image", e.target.value)
                      }
                      className="rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                    />

                    {colorImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeColorImageField(index)}
                        className="rounded-xl bg-red-500 px-4 py-2 text-white md:col-span-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addColorImageField}
                className="mt-4 rounded-xl bg-zinc-900 px-5 py-3 text-white dark:bg-white dark:text-black"
              >
                + Add Color Image
              </button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                className="rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:scale-105 dark:bg-white dark:text-black"
              >
                {editingProductId ? "Update Product" : "Add Product"}
              </button>

              {editingProductId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-zinc-300 px-8 py-4 font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-zinc-900"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-64 w-full object-cover"
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

                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Stock: {product.stock ?? 0}
                </p>

                {(product.colorImages?.length > 0 ||
                  product.colors?.length > 0) && (
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Colors:{" "}
                    {product.colorImages?.length > 0
                      ? product.colorImages.map((item) => item.color).join(", ")
                      : product.colors.join(", ")}
                  </p>
                )}

                {product.sizes?.length > 0 && (
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Sizes: {product.sizes.join(", ")}
                  </p>
                )}

                {product.colorImages?.length > 0 && (
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Color Images: {product.colorImages.length}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => editProductHandler(product)}
                    className="rounded-2xl bg-black px-5 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProductHandler(product._id)}
                    className="rounded-2xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
