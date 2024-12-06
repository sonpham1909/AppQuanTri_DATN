import {createSlice} from '@reduxjs/toolkit';
import {
  register,
  login,
  fetchUserInfo,
  fetchUserInfoVS1,
  updateAvatar
} from '../actions/actionUser';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  userInfo: {},
  userInfovs1: {},
  avatar: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
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
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login response payload:', action.payload); // Debug
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.accessToken;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Đăng nhập không thành công';
      })
      .addCase(fetchUserInfo.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo[action.meta.arg] = action.payload;
        console.log('User info updated in store:', state.userInfo); // Debug
      })
      .addCase(fetchUserInfoVS1.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfoVS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfovs1 = action.payload;
        console.log('User info fetched by token:', state.userInfovs1); // Debug
      })
      .addCase(fetchUserInfoVS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          'Lấy thông tin người dùng không thành công';
      })
        .addCase(updateAvatar.pending, state => {
          state.isLoading = true;
        })
        .addCase(updateAvatar.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.avatar = action.payload.avatar; 
          console.log('Avatar updated successfully:', state.avatar); 
        })
        .addCase(updateAvatar.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload?.message || 'Cập nhật avatar không thành công';
        });
  },
});

export const {reset} = userSlice.actions;
export default userSlice.reducer;
