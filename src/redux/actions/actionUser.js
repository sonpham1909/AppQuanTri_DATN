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


