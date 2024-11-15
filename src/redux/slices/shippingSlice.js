// Initial state

import {createSlice} from '@reduxjs/toolkit';
import {fetchShippingMethods} from '../actions/actionShipping';
const initialState = {
  shippingMethods: [],
  isLoading: false,
  error: null,
};

// Shipping slice
const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShippingMethods.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShippingMethods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shippingMethods = action.payload;
      })
      .addCase(fetchShippingMethods.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default shippingSlice.reducer;
