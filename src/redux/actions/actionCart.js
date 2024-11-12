import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import tokenService from '../../services/tokenService';
import {API_URL} from '@env';

// Action để lấy danh sách sản phẩm trong giỏ hàng
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
    try {
        const token = await tokenService.getToken();
        console.log('Token:', token); // Log token
        const response = await axios.get(`${API_URL}/cart/cart_by_user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Response Data:', response.data); // Log response từ server
        return response.data;
    } catch (error) {
        console.error('Error:', error.message); // Log lỗi
        return thunkAPI.rejectWithValue(
            error.response ? error.response.data.message : error.message
        );
    }
});

export const addTocCart = createAsyncThunk(
    'cart/addToCart',
    async (cartData, thunkAPI) => {
        try {
            const token = await tokenService.getToken();
            const response = await axios.post(
                `${API_URL}/cart/add_to_cart`,
                cartData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('Response Data:', response.data); // Log response từ server
            return response.data; // Trả về địa chỉ mới được thêm
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const updatequantity = createAsyncThunk(
    'cart/updateQuantity',
    async (cartData, thunkAPI) => {
        try {
            const token = await tokenService.getToken();
            const response = await axios.put(
                `${API_URL}/cart/update_quantity`,
                cartData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('Response Data:', response.data); // Log response từ server
            return response.data; // Trả về địa chỉ mới được thêm
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const deleteCartItem = createAsyncThunk(
    'cart/deletecart',
    async (cartItemId, thunkAPI) => {
        try {
            const token = await tokenService.getToken();
            const response = await axios.delete(
                `${API_URL}/cart/${cartItemId}/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('Response Data:', response.data); // Log response từ server
            return cartItemId; // Trả về `cartItemId` đã được xóa
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
