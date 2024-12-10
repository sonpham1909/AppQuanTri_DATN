// redux/actions/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tokenService from '../../services/tokenService';
import { API_URL } from '@env';

// Action đăng ký
export const register = createAsyncThunk('v1/auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Đã xảy ra lỗi trong quá trình đăng ký');
  }
});

// Action đăng nhập
export const login = createAsyncThunk('v1/auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    await tokenService.setToken(response.data.accessToken);
    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Đã xảy ra lỗi trong quá trình đăng nhập');
  }
});

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (userId, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(`${API_URL}/users/${userId}/get_user_info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched user info:', response.data); // Debug
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);


export const fetchUserInfoVS1 = createAsyncThunk(
  'user/fetchUserInfoVs1',
  async (_, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(`${API_URL}/users/getuserVersion1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

// Action cập nhật avatar người dùng
export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ userId, avatarData }, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const formData = new FormData();
      formData.append('avatar', {
        uri: avatarData.uri,
        name: 'avatar.jpg', 
        type: avatarData.type || 'image/jpeg', 
      });  
      const response = await axios.put(`${API_URL}/users/${userId}/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật avatar:', error);
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
      
export const resetPasswordRequest = createAsyncThunk(
  'v1/users/sendresetpasswordemail',
  async ({ email }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/users/sendresetpasswordemail`, { email });
      return response.data.message || 'Email đặt lại mật khẩu đã được gửi';
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 'Gửi email đặt lại mật khẩu thất bại';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const verifyOtpRequest = createAsyncThunk(
  'v1/users/verifyOtp',
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/users/verify-otp`, { email, otp });

      return response.data.message || 'OTP xác thực thành công';
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Xác thực OTP thất bại'
      );
    }
  });
export const resetPassword = createAsyncThunk(
  'users/reset-password',
  async ({ email, otp, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/reset-password`,
        { email, otp, newPassword }
      );

      return response.data.message;
    } catch (error) {
      console.error('Lỗi backend:', error.response?.data);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Đặt lại mật khẩu thất bại'
      );
    }
  }
);


export const sendOTPtoEmail = createAsyncThunk(
  'user/sendOTPtoEmail',
  async (email, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.post(`${API_URL}/verifi/sendVerifiEmail`,{email: email}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
// Action đổi mật khẩu
export const changePassword = createAsyncThunk(
  'user/updateUser',
  async ({ userId, oldPassword, newPassword }, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.put(
        `${API_URL}/users/${userId}/update_user`,
        { oldPassword, password:newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
