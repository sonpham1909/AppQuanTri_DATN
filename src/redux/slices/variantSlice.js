import { createSlice } from '@reduxjs/toolkit';
import { fetchVariantsByProductId, fetchColorsAndSizesBySubCategoryId } from '../actions/actionsVariant';

const initialState = {
  variants: {},
  colorsAndSizesBySubCategoryId: {}, // Cập nhật thành đối tượng
  isLoadingFilterOptions: false,
  error: null,
  isLoading: false,
};

const variantSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVariantsByProductId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVariantsByProductId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.variants[action.meta.arg] = action.payload;
      })
      .addCase(fetchVariantsByProductId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchColorsAndSizesBySubCategoryId.pending, (state) => {
        state.isLoadingFilterOptions = true;
      })
      .addCase(fetchColorsAndSizesBySubCategoryId.fulfilled, (state, action) => {
        state.isLoadingFilterOptions = false;
        // Thêm biến thể vào `colorsAndSizesBySubCategoryId` với `subCategoryId` làm khóa
        state.colorsAndSizesBySubCategoryId[action.meta.arg] = action.payload;
      })
      .addCase(fetchColorsAndSizesBySubCategoryId.rejected, (state, action) => {
        state.isLoadingFilterOptions = false;
        state.error = action.payload;
      });
  },
});

export default variantSlice.reducer;
