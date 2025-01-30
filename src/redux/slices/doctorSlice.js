import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        selected: null,
    },
    reducers: {
        selectedDoctor: (state, action) => {
            state.selected = action.payload;
        }
    }
});

export const { selectedDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;