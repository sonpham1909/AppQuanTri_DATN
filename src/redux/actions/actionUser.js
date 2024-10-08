import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL API của bạn
// URL API của bạn
const API_URL = 'http://10.0.3.2:5000/api/auth';

// Action đăng ký
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    console.log("Sending user data to server:", userData);  // Log dữ liệu gửi lên server
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
// Action đăng nhập

// Action đăng nhập
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        const { accessToken } = response.data;

        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem('accessToken', accessToken);

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});




