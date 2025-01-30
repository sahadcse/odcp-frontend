import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {

            if (action.payload.role === 'doctor') {
                state.userInfo = action.payload.data.doctor;
            } else if (action.payload.role === 'patient') {
                state.userInfo = action.payload.data.patient;
            } else {
                state.userInfo = action.payload.data.admin;
            }
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
            state.isAuthenticated = false;
            Cookies.remove('token');
        },
        update: (state, action) => {
            state.userInfo = action.payload;
        }
    }
});

export const { login, logout, update } = userSlice.actions;
export default userSlice.reducer;