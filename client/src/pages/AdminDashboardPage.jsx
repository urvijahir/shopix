import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [isNewProduct, setIsNewProduct] = useState(false);

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
    setIsNewProduct(false);
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
      isNewProduct,
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
    setIsNewProduct(product.isNewProduct || false);

    setColorImages(
      product.colorImages?.length > 0
        ? product.colorImages
        : [{ color: "", image: "" }],
    );

    document.getElementById("product-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-6 py-10 dark:from-zinc-950 dark:via-zinc-950 dark:to-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase  text-violet-600">
            Shopix Admin
          </p>

          <h1 className="mt-2 text-5xl font-bold text-zinc-900 dark:text-white">
            Manage Products
          </h1>

          <Link
            to="/admin/orders"
            className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            📦 Manage Orders
          </Link>
        </div>

        <div
          id="product-form"
          className="scroll-mt-6 rounded-[30px] border border-violet-100 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
        >
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
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
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
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              required
            />
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isNew"
                checked={isNewProduct}
                onChange={(e) => setIsNewProduct(e.target.checked)}
                className="h-5 w-5 rounded border-zinc-300 accent-violet-600"
              />

              <label
                htmlFor="isNew"
                className="font-medium text-zinc-700 dark:text-zinc-200"
              >
                Mark as New Product
              </label>
            </div>

            <input
              type="number"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              required
            />

            <input
              type="text"
              placeholder="Available Colors ( Red , Blue , Black )"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />

            <input
              type="text"
              placeholder=" Available Sizes ( XS , S , M , L , XL )"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />

            <input
              type="text"
              placeholder="Main Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              required
            />

            <input
              type="text"
              placeholder="Gallery Images URLs (comma separated)"
              value={galleryImages}
              onChange={(e) => setGalleryImages(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white md:col-span-2"
              required
            />

            <div className="md:col-span-2">
              <h3 className="mb-3 font-semibold text-zinc-900 dark:text-white">
                Color Images
              </h3>
              <p className="text-sm text-zinc-500">
                Upload an image for every product color.
              </p>
              <br />

              <div className="space-y-4">
                {colorImages.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-3xl border border-violet-100 bg-violet-50 p-5 shadow-sm transition duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 md:grid-cols-2"
                  >
                    <input
                      type="text"
                      placeholder="Color name e.g. Red"
                      value={item.color}
                      onChange={(e) =>
                        updateColorImageField(index, "color", e.target.value)
                      }
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    />

                    <input
                      type="text"
                      placeholder="Image URL for this color"
                      value={item.image}
                      onChange={(e) =>
                        updateColorImageField(index, "image", e.target.value)
                      }
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
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
                className="mt-5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                + Add Color Image
              </button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-semibold text-white transition duration-300 hover:scale-105"
              >
                {editingProductId ? "Update Product" : "Add Product"}
              </button>

              {editingProductId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border focus:border-violet-500 focus:ring-2 focus:ring-violet-200 px-8 py-4 font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-bold">All Products</h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-zinc-900"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-64 w-full rounded-2xl object-cover"
                />

                <div className="p-6">
                  <p className="text-sm font-semibold rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                    {product.category}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white">
                    {product.title}
                  </h2>

                  <div className="inline-block rounded-xl bg-violet-100 px-4 py-2 text-xl font-bold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                    ₹{product.price.toLocaleString("en-IN")}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock • ${product.stock}`
                      : "Out of Stock"}
                  </span>

                  {(product.colorImages?.length > 0 ||
                    product.colors?.length > 0) && (
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                      Colors:{" "}
                      {product.colorImages?.length > 0
                        ? product.colorImages
                            .map((item) => item.color)
                            .join(", ")
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

                  <div className="mt-6 flex items-center gap-4">
                    <button
                      onClick={() => editProductHandler(product)}
                      className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600  px-5 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProductHandler(product._id)}
                      className="rounded-2xl border border-red-300 bg-white px-6 py-3 font-medium text-red-600 transition duration-300 hover:bg-red-500 hover:text-white hover:border-red-500 dark:border-red-500/40 dark:bg-zinc-900 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
