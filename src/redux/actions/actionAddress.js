// redux/actions/actionAddress.js

import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import tokenService from '../../services/tokenService';
console.log('API_URL:', API_URL);

//  lấy tất cả địa chỉ
export const fetchAllAddresses = createAsyncThunk(
  'addresses/fetchAllAddresses',
  async (_, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.get(`${API_URL}/address/list_address_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message,
      );
    }
  },
);

// cập nhật địa chỉ mặc định
export const updateDefaultAddress = createAsyncThunk(
  'addresses/updateDefaultAddress',
  async (addressId, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.put(
        `${API_URL}/address/${addressId}/set-default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data; // Trả về địa chỉ đã được cập nhật
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message,
      );
    }
  },
);

//  xóa địa chỉ (không cho phép xóa địa chỉ mặc định)
export const deleteAddress = createAsyncThunk(
  'addresses/deleteAddress',
  async (addressId, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      // Thực hiện xóa địa chỉ
      const response = await axios.delete(`${API_URL}/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Trả về thông tin địa chỉ đã xóa
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message,
      );
    }
  },
);
//thêm địa chỉ

export const addAddress = createAsyncThunk(
  'addresses/addAddress',
  async (addressData, thunkAPI) => {
    try {
      const token = await tokenService.getToken();
      const response = await axios.post(
        `${API_URL}/address/addressesApp`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.address; // Trả về địa chỉ mới được thêm
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
