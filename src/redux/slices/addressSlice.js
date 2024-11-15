import { createSlice } from '@reduxjs/toolkit';
import { fetchAllAddresses, updateDefaultAddress, deleteAddress,addAddress,fetchDefaultAddress } from '../actions/actionAddress';

const initialState = {
  addressesList: [],
  defaultAddress: null,
  isLoading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý khi lấy tất cả địa chỉ
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        console.log('Fetched Addresses:', action.payload); // Kiểm tra dữ liệu trả về
        state.isLoading = false;
        state.addressesList = Array.isArray(action.payload) ? action.payload : []; // Gán giá trị luôn là mảng
        state.error = null;
      })
      .addCase(fetchAllAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Xử lý khi cập nhật địa chỉ mặc định
      .addCase(updateDefaultAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDefaultAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressesList = state.addressesList.map(address =>
          address._id === action.payload._id ? { ...address, isDefault: true } : { ...address, isDefault: false }
        );
        state.error = null;
      })
      .addCase(updateDefaultAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Xử lý khi xóa địa chỉ
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressesList = state.addressesList.filter(address => address._id !== action.payload._id);
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Thêm địa chỉ mới
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressesList.push(action.payload); // Thêm địa chỉ mới vào danh sách
        state.error = null;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Lấy địa chỉ mặc định của người dùng
      .addCase(fetchDefaultAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDefaultAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.defaultAddress = action.payload;
      })
      .addCase(fetchDefaultAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
