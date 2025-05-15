// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../models/usuarioLogin";

// Definir la composición de la variable reactiva
interface UserState {
    userInfo: loginUser | null;
}

const storedUser = localStorage.getItem("loginUser");
const initialState: UserState = {
    userInfo: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<loginUser | null>) => {
            state.userInfo = action.payload;
            if (action.payload) {
                localStorage.setItem("loginUser", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("loginUser");
            }
        },
        // Nueva acción para el logout
        clearUserInfo: (state) => {
            state.userInfo = null;
            localStorage.removeItem("loginUser")
        }
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;