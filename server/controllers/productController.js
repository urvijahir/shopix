import Product from "../models/productModel.js";

// GET PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      category,
      image,
      galleryImages,
      description,
      colors,
      colorImages,
      sizes,
      stock,
    } = req.body;

    const product = new Product({
      title,
      price,
      category,
      image,
      galleryImages,
      description,
      colors,
      colorImages,
      sizes,
      stock,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({
        message: "Product removed",
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image;
    product.description = req.body.description || product.description;
    product.colors = req.body.colors || product.colors;
    product.sizes = req.body.sizes || product.sizes;
    product.stock = req.body.stock ?? product.stock;
    product.colorImages = req.body.colorImages || product.colorImages;
    product.colorImages =
      req.body.colorImages !== undefined
        ? req.body.colorImages
        : product.colorImages;
    product.galleryImages =
      req.body.galleryImages !== undefined
        ? req.body.galleryImages
        : product.galleryImages;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//PRODUCT REVIEW
const createProductReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = {
      name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added",
      reviews: product.reviews,
      rating: product.rating,
      numReviews: product.numReviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
};
