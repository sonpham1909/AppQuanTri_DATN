import { createSlice } from '@reduxjs/toolkit';
import { register, login,fetchUserInfo } from '../actions/actionUser';

const initialState = {
  user: null,
  token: null,
  userInfo: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  userInfo: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Đăng ký không thành công';
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Đăng nhập không thành công';
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo[action.meta.arg] = action.payload;
        console.log('User info updated in store:', state.userInfo); // Debug
      })
      
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
