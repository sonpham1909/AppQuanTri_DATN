import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import tokenService from '../../services/tokenService';

// Action đăng ký
export const register = createAsyncThunk('v1/auth/register', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Đã xảy ra lỗi trong quá trình đăng ký');
  }
});

export const login = createAsyncThunk('v1/auth/login', async (userData, thunkAPI) => {
  try {
    const response = await authService.login(userData);

    // Lưu token vào AsyncStorage
    await tokenService.setToken(response.accessToken);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Đã xảy ra lỗi trong quá trình đăng nhập');
  }
});



