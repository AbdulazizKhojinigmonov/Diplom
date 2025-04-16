import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Ensure this path is correct

export const store = configureStore({
  reducer: {
    auth: authReducer, // This must match how we access state
  },
});

// Define RootState correctly
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
