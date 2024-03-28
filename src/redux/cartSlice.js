import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity++;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id != id);
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const updatingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (updatingItemIndex !== -1) {
        //if the item is found in the cart
        const updateCartItems = [...state.cartItems]; //create a copy of cart item
        updateCartItems[updatingItemIndex] = {
          //update the quantity of specified item
          ...updateCartItems[updatingItemIndex],
          quantity: updateCartItems[updatingItemIndex].quantity + 1,
        };
        state.cartItems = updateCartItems; //update the stare with the new cart item
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const updatingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (updatingItemIndex !== -1) {
        //if the item is found in the cart
        const updateCartItems = [...state.cartItems]; //create a copy of cart item
        updateCartItems[updatingItemIndex] = {
          //update the quantity of specified item
          ...updateCartItems[updatingItemIndex],
          quantity: updateCartItems[updatingItemIndex].quantity - 1,
        };
        state.cartItems = updateCartItems; //update the stare with the new cart item
      }
      if (state.cartItems[updatingItemIndex].quantity < 1) {
        state.cartItems = state.cartItems.filter((item) => item.id != id);
      }
    },
  },
});

export const {
  addItemToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
