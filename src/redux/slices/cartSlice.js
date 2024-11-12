import { createSlice } from '@reduxjs/toolkit';
import { addTocCart, deleteCartItem, fetchCart, updatequantity } from '../actions/actionCart';


const initialState = {
  cart: [],
  cartLength: null,
  isLoading: false,
  isLoadingQuantity:false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Xử lý khi lấy cartItem
      .addCase(fetchCart.pending, (state) => {
        console.log('Fetch Cart Pending'); // Debug pending
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log('Fetch Cart Fulfilled Payload:', action.payload); // Debug payload
        state.isLoading = false;
        state.cart = action.payload;
        state.cartLength = state.cart.length;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.error('Fetch Cart Rejected:', action.payload); // Debug rejected
        state.isLoading = false;
        state.error = action.payload; // sử dụng thông tin từ `thunkAPI.rejectWithValue`
      })

      .addCase(addTocCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTocCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart.push(action.payload); // Thêm địa chỉ mới vào danh sách
        state.error = null;
      })
      .addCase(addTocCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(updatequantity.pending, (state) => {
        state.isLoadingQuantity = true;
        state.error = null;
      })
      .addCase(updatequantity.fulfilled, (state, action) => {
        state.isLoadingQuantity = false;
        // Cập nhật sản phẩm với số lượng mới
        const updatedCart = state.cart.map((item) =>
          item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item
        );
        state.cart = updatedCart;
        state.error = null;
      })
      .addCase(updatequantity.rejected, (state, action) => {
        state.isLoadingQuantity = false;
        state.error = action.error.message;
      })

      .addCase(deleteCartItem.pending, (state) => {
        state.error=null
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        console.log('Deleted Item _id:', action.payload); // Debug _id được trả về từ action.payload
        state.cart = state.cart.filter(cart => cart._id !== action.payload); // Thay đổi trực tiếp state.cart
        state.cartLength = state.cart.length; 
        state.error = null;
      })
      
      
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoadingQuantity = false;
        state.error = action.error.message;
      })
  }
});

export default cartSlice.reducer;
