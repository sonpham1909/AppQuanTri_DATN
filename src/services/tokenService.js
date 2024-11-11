import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'accessToken';
const TOKEN_EXPIRATION_KEY = 'accessTokenExpiration';

// Lưu token vào AsyncStorage với thời gian hết hạn
const setToken = async (token, expiresIn = 3600) => {
  try {
    const expirationTime = Date.now() + expiresIn * 1000; // Tính thời gian hết hạn (milliseconds)
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(TOKEN_EXPIRATION_KEY, expirationTime.toString());
  } catch (error) {
    console.error('Failed to save the token', error);
  }
};

// Lấy token từ AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const expirationTime = await AsyncStorage.getItem(TOKEN_EXPIRATION_KEY);
    if (token && expirationTime) {
      const currentTime = Date.now();
      if (currentTime < parseInt(expirationTime)) {
        return token;
      } else {
        // Token đã hết hạn, xóa khỏi AsyncStorage
        await removeToken();
        console.error('Token has expired');
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch the token', error);
  }
};

// Xóa token khỏi AsyncStorage
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(TOKEN_EXPIRATION_KEY);
  } catch (error) {
    console.error('Failed to remove the token', error);
  }
};

export default {
  setToken,
  getToken,
  removeToken,
};
