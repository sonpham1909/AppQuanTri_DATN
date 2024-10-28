import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'accessToken';

// Lưu token vào AsyncStorage
const setToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save the token', error);
  }
};

// Lấy token từ AsyncStorage
const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to fetch the token', error);
  }
};

// Xóa token
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove the token', error);
  }
};

export default {
  setToken,
  getToken,
  removeToken,
};
