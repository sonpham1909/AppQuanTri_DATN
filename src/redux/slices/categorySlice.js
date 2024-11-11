// redux/slices/categorySlice.js

import {createSlice} from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchSubCategoriesByParent,
  fetchProductsBySubCategory,
} from '../actions/actionCategory';

const initialState = {
  categories: [],
  subCategories: [],
  products: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      // Xử lý khi lấy danh mục cha
      .addCase(fetchCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Xử lý khi lấy danh mục con
      .addCase(fetchSubCategoriesByParent.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchSubCategoriesByParent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategoriesByParent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Xử lý khi lấy sản phẩm theo danh mục con
      .addCase(fetchProductsBySubCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchProductsBySubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload; // Cập nhật products từ API
      })
      .addCase(fetchProductsBySubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
