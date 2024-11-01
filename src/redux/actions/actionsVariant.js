// src/redux/actions/variantActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tokenService from '../../services/tokenService'; // Dịch vụ để lấy token
import { API_URL } from '@env'; // URL API từ biến môi trường

// Action để lấy danh sách biến thể theo productId
export const fetchVariantsByProductId = createAsyncThunk(
  'variants/fetchVariantsByProductId',
  async (productId, thunkAPI) => {
    try {
      const token = await tokenService.getToken(); // Lấy token
      const response = await axios.get(`${API_URL}/variants/${productId}/getVariantByProductId` , {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message); // Xử lý lỗi
    }
  }
);

export const fetchColorsAndSizesBySubCategoryId = createAsyncThunk(
  'variants/fetchColorsAndSizesBySubCategoryId',
  async (subCategoryId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/variants/colorsAndSizesBySubCategoryId/${subCategoryId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);