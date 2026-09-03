import { createSlice } from "@reduxjs/toolkit";

// Get the currently logged-in user's cart storage key
const getUserCartKey = () => {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) return null;

  const user = JSON.parse(userInfo);

  return user?._id ? `cartItems_${user._id}` : null;
};

// Load the current user's cart when Redux starts
const getInitialCart = () => {
  const key = getUserCartKey();

  if (!key) return [];

  const savedCart = localStorage.getItem(key);

  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  cartItems: getInitialCart(),
};

// Check whether two cart items are the same
const isSameCartItem = (item, payload) =>
  item._id === payload._id &&
  item.selectedColor === payload.selectedColor &&
  item.selectedSize === payload.selectedSize;

// Save cart for the currently logged-in user
const saveCart = (cartItems) => {
  const key = getUserCartKey();

  if (key) {
    localStorage.setItem(key, JSON.stringify(cartItems));
  }
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => isSameCartItem(x, item));

      if (existItem) {
        existItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }

      saveCart(state.cartItems);
    },

    // Remove product from cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => !isSameCartItem(item, action.payload),
      );

      saveCart(state.cartItems);
    },

    // Increase product quantity
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) =>
        isSameCartItem(x, action.payload),
      );

      if (item) {
        item.quantity += 1;
      }

      saveCart(state.cartItems);
    },

    // Decrease product quantity
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) =>
        isSameCartItem(x, action.payload),
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCart(state.cartItems);
    },

    // Load a particular user's cart after login
    loadCartForUser: (state, action) => {
      const userId = action.payload;

      const key = `cartItems_${userId}`;

      const savedCart = localStorage.getItem(key);

      state.cartItems = savedCart ? JSON.parse(savedCart) : [];
    },

    // Clear Redux cart only during logout
    // IMPORTANT: This does NOT delete the user's saved cart
    clearCartState: (state) => {
      state.cartItems = [];
    },

    clearCart: (state) => {
      state.cartItems = [];

      const key = getUserCartKey();

      if (key) {
        localStorage.removeItem(key);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  loadCartForUser,
  clearCartState,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
