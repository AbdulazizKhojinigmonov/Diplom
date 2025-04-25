import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Убедись, что путь верный

export const store = configureStore({
  reducer: {
    auth: authReducer, // имя должно совпадать
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
