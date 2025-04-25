// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
//   username: string;
//   password: string;
// }

// interface AuthState {
//   isAuthenticated: boolean;
//   user: User | null;
// }

// const loadUserFromStorage = (): User | null => {
//   const savedUser = localStorage.getItem("user");
//   return savedUser ? JSON.parse(savedUser) : null;
// };

// const initialState: AuthState = {
//   user: loadUserFromStorage(),
//   isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     register: (state, action: PayloadAction<User>) => {
//       localStorage.setItem("user", JSON.stringify(action.payload));
//       state.user = action.payload;
//       state.isAuthenticated = false; // После регистрации нужно логиниться
//     },
//     login: (state, action: PayloadAction<User>) => {
//       const savedUser = localStorage.getItem("user");
//       if (savedUser) {
//         const parsedUser = JSON.parse(savedUser);
//         // Сверяем username и password
//         if (
//           parsedUser.username === action.payload.username &&
//           parsedUser.password === action.payload.password
//         ) {
//           state.user = parsedUser;
//           state.isAuthenticated = true;
//           localStorage.setItem("isAuthenticated", "true");
//         } else {
//           alert("Неверное имя пользователя или пароль");
//         }
//       } else {
//         alert("Пользователь не зарегистрирован");
//       }
//     },
//     logout: (state) => {
//       localStorage.removeItem("user");
//       localStorage.removeItem("isAuthenticated");
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { register, login, logout } = authSlice.actions;
// export default authSlice.reducer;
