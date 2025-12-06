import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setCartItem: (state, action) => {
      const newItem = action.payload;
      const existing = state.cartItems.find(
        (i) => i.product === newItem.product
      );

      let addBy = parseInt(newItem.quantity, 10);
      if (!addBy || addBy < 1) addBy = 1;

      if (existing) {
        let q = (existing.quantity || 1) + addBy;
        if (typeof existing.stock === "number" && q > existing.stock)
          q = existing.stock;
        existing.quantity = q;
      } else {
        let q = addBy;
        if (typeof newItem.stock === "number" && q > newItem.stock)
          q = newItem.stock;
        state.cartItems.push({ ...newItem, quantity: q });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseItemQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i.product === id);
      if (!item) return;

      if (typeof item.stock === "number" && item.quantity >= item.stock) return;
      item.quantity += 1;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseItemQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i.product === id);
      if (!item) return;

      if (item.quantity <= 1) return;
      item.quantity -= 1;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItemFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.product !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state, action) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export default cartSlice.reducer;

export const {
  setCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
  saveShippingInfo,
  clearCart,
} = cartSlice.actions;
