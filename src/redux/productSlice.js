import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Initial state for products
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Reducer function to set products
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // Reducer function to update a product
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    // Reducer function to delete a product
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
  },
});

export const { setProducts, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
