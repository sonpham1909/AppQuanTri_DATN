// redux/actions/productActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tokenService from '../../services/tokenService';

const API_URL = 'http://10.0.3.2:3000/v1/products'; // Đặt URL cơ bản tại đây

// Action để lấy đánh giá và điểm trung bình cho một sản phẩm
export const fetchProductReviews = createAsyncThunk(
  'products/fetchProductReviews',
  async (productId, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(`${API_URL}/reviews/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        productId,
        totalReviews: response.data.totalReviews,
        averageRating: response.data.averageRating,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

// Action để lấy danh sách sản phẩm mới nhất
export const fetchLatestProducts = createAsyncThunk(
  'products/fetchLatestProducts',
  async (_, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(`${API_URL}/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);