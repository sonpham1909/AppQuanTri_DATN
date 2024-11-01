// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import categoryReducer from '../slices/categorySlice';
import productReducer from '../slices/productSlice';
import favoriteReducer from '../slices/favoriteSlice';
import reviewResponsesReducer from '../slices/reviewSlice';
import variantReducer from '../slices/variantSlice'; // Import variantSlice

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
    favorites: favoriteReducer,
    reviewResponses: reviewResponsesReducer,
    variants: variantReducer, // Thêm variantReducer vào store

  },
});

export default store;
