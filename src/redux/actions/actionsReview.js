// redux/actions/reviewActions.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import tokenService from '../../services/tokenService';

// URL API
import {API_URL} from '@env';

export const fetchProductReviewResponses = createAsyncThunk(
  'reviewResponses/fetchProductReviewResponses',
  async (productId, thunkAPI) => {
    try {
      const token = await tokenService.getToken();

      const response = await axios.get(
        `${API_URL}/Review/product/${productId}/reviews_with_responses`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return {productId, reviews: response.data};
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message,
      );
    }
  },
);
