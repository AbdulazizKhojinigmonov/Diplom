import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null; // Make sure 'user' is here
}

const loadUserFromStorage = (): User | null => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
};

const initialState: AuthState = {
  isAuthenticated: !!loadUserFromStorage(),
  user: loadUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login: (state, action: PayloadAction<User>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
