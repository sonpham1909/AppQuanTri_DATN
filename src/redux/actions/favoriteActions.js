// redux/actions/favoriteActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tokenService from '../../services/tokenService';

import {API_URL} from '@env'


const API_URL_App = process.env.API_URL+'/favorite';

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (productId, { dispatch, getState }) => {
    try {
      const token = await tokenService.getToken();
      await axios.post(
        `${API_URL_App}/toggle`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Sau khi toggle, cập nhật lại danh sách yêu thích từ API
      return dispatch(fetchFavoriteList()).unwrap();
    } catch (error) {
      throw error.response ? error.response.data.message : error.message;
    }
  }
);

export const fetchFavoriteList = createAsyncThunk(
  'favorites/fetchFavoriteList',
  async (_, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(`${API_URL_App}/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.favorites;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);
