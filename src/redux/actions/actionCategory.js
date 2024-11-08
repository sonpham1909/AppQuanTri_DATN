// redux/actions/actionCategory.js

import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import tokenService from '../../services/tokenService';
import {API_URL} from '@env';
console.log('API_URL:', API_URL);

// Action để lấy danh sách danh mục cha từ API
export const fetchCategories = createAsyncThunk('/', async (_, thunkAPI) => {
  try {
    const token = await tokenService.getToken();
    const response = await axios.get(`${API_URL}/categorys`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Action để lấy danh mục con dựa theo danh mục cha
export const fetchSubCategoriesByParent = createAsyncThunk(
  'categories/fetchSubCategoriesByParent',
  async (categoryId, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(
        `${API_URL}/categorys/${categoryId}/subcategories`, {
          // Sửa thành /subcategories
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Action để lấy sản phẩm theo danh mục con
export const fetchProductsBySubCategory = createAsyncThunk(
  'products/fetchProductsBySubCategory',
  async (subCategoryId, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(
        `${API_URL}/categorys/subcategories/${subCategoryId}/products`,
        {
          // Sửa thành /subcategories/${subCategoryId}/products
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
