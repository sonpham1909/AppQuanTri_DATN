// redux/actions/actionCategory.js

import { createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';
import tokenService from '../../services/tokenService';

const API_URL = 'http://10.0.3.2:3000/v1/categorys';

// Action để lấy danh sách danh mục cha từ API
export const fetchCategories = createAsyncThunk('/', async (_, thunkAPI) => {
  try {
    const token = await tokenService.getToken();
    const response = await axios.get(API_URL, {
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
export const fetchSubCategoriesByParent = createAsyncThunk('categories/fetchSubCategoriesByParent', async (categoryId, thunkAPI) => {
  try {
    const token = await tokenService.getToken();
    const response = await axios.get(`${API_URL}/${categoryId}/subcategories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Action để lấy sản phẩm theo danh mục con
export const fetchProductsBySubCategory = createAsyncThunk('products/fetchProductsBySubCategory', async (subCategoryId, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(`${API_URL}/subcategories/${subCategoryId}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
