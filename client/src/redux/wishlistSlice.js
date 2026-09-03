import { createSlice } from "@reduxjs/toolkit";

const getUserWishlistKey = () => {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) return null;

  const user = JSON.parse(userInfo);

  return user?._id ? `wishlistItems_${user._id}` : null;
};

const getInitialWishlist = () => {
  const key = getUserWishlistKey();

  if (!key) return [];

  const savedWishlist = localStorage.getItem(key);

  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

const initialState = {
  wishlistItems: getInitialWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;

      const existItem = state.wishlistItems.find((x) => x._id === item._id);

      if (!existItem) {
        state.wishlistItems.push(item);
      }

      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        const user = JSON.parse(userInfo);

        if (user?._id) {
          localStorage.setItem(
            `wishlistItems_${user._id}`,
            JSON.stringify(state.wishlistItems),
          );
        }
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload,
      );

      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        const user = JSON.parse(userInfo);

        if (user?._id) {
          localStorage.setItem(
            `wishlistItems_${user._id}`,
            JSON.stringify(state.wishlistItems),
          );
        }
      }
    },

    // Load wishlist when user logs in
    loadWishlistForUser: (state, action) => {
      const userId = action.payload;

      const key = `wishlistItems_${userId}`;
      const savedWishlist = localStorage.getItem(key);

      state.wishlistItems = savedWishlist ? JSON.parse(savedWishlist) : [];
    },

    // Clear Redux state only.
    // IMPORTANT: Do NOT delete localStorage.
    clearWishlistState: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  loadWishlistForUser,
  clearWishlistState,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
