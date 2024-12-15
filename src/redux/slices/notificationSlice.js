import { createSlice } from '@reduxjs/toolkit';
import { fetchNotification } from '../actions/actionNotification';

const initialState = {
  notification: [],
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // Action để thêm thông báo từ socket
    addNotification: (state, action) => {
      state.notification = [action.payload, ...state.notification]; // Thêm thông báo mới vào đầu danh sách
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notification = action.payload;
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export action để sử dụng trong component
export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
