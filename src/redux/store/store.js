import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../slices/userSlice';
import categoryReducer from '../slices/categorySlice';
import productReducer from '../slices/productSlice';
import favoriteReducer from '../slices/favoriteSlice';
import reviewResponsesReducer from '../slices/reviewSlice';
import variantReducer from '../slices/variantSlice';
import addressReducer from '../slices/addressSlice';
import cartReducer from '../slices/cartSlice';

// Persist configuration for user
const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user'], // Chỉ định reducer user cần lưu trữ
};

// Persist configuration for cart
const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
  whitelist: ['cart'], // Chỉ định reducer cart cần lưu trữ
};

// Persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    categories: categoryReducer,
    products: productReducer,
    favorites: favoriteReducer,
    reviewResponses: reviewResponsesReducer,
    variants: variantReducer,
    addresses: addressReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Bỏ qua hành động persist
      },
    }),
});

export const persistor = persistStore(store);
export default store;
