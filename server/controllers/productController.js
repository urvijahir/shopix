const products = [
  {
    id: 1,
    title: "Premium Sneakers",
    price: 120,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Modern premium sneakers for daily comfort.",
  },

  {
    id: 2,
    title: "Wireless Headphones",
    price: 220,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "High quality wireless audio experience.",
  },
];

export const getProducts = async (req, res) => {
  res.json(products);
};
