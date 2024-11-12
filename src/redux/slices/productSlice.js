// redux/slices/productSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {
  fetchProductReviews,
  fetchLatestProducts,
  fetchPopularProducts,
  fetchProductsByVariant,
  fetchProductById,
  fetchtProductById,
} from '../actions/actionProduct';

const initialState = {
  reviews: {},
  latestProducts: [],
  popularProducts: [],
  productsByVariant: [],
  productDetails: {}, // Chi tiết sản phẩm được lưu trữ tại đây
  productById:[],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductReviews.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews[action.payload.productId] = {
          totalReviews: action.payload.totalReviews,
          averageRating: action.payload.averageRating,
        };
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Xử lý khi lấy sản phẩm mới nhất thành công
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.latestProducts = action.payload;
      })
      .addCase(fetchLatestProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchPopularProducts.fulfilled, (state, action) => {
        state.popularProducts = action.payload; // Sửa để lưu vào popularProducts
      })
      .addCase(fetchPopularProducts.rejected, (state, action) => {
        state.error = action.payload;
        console.error('Error fetching popular products:', action.payload);
      })
      .addCase(fetchProductsByVariant.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchProductsByVariant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsByVariant = action.payload;
      })
      .addCase(fetchProductsByVariant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(fetchProductById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        const { productId, productDetails } = action.payload;
        if (productId && productDetails) {
          state.productDetails[productId] = productDetails; // Lưu sản phẩm với productId làm khóa
        }
      })      
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchtProductById.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchtProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productById = action.payload;
      })
      .addCase(fetchtProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
