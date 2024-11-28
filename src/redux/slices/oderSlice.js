import {createSlice} from '@reduxjs/toolkit';
import {
  createOrder,
  fetchOrdersByStatus,
  fetchOrderDetails,
  fetchPurchasedProducts,
  cancelOrder
} from '../actions/actionOder';

const initialState = {
  orders: [],
  orderDetails: [],
  purchasedProducts: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload.order);
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersByStatus.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrdersByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPurchasedProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPurchasedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchasedProducts = action.payload;
      })
      .addCase(fetchPurchasedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(cancelOrder.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(order => order._id !== action.meta.arg.orderId);
        state.error = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default orderSlice.reducer;
