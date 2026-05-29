import { createSlice } from "@reduxjs/toolkit";

const wishlistItemsFromStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];

const initialState = {
  wishlistItems: wishlistItemsFromStorage,
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;

      const existItem = state.wishlistItems.find((x) => x.id === item.id);

      if (!existItem) {
        state.wishlistItems.push(item);
      }

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems),
      );
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload,
      );

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems),
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
