import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    periods: []
};

const periodSlice = createSlice({
    name: 'periods',
    initialState,
    reducers: {
        setPeriods(state, action) {
            state.periods = action.payload
        }
    },
});

export const { setPeriods } = periodSlice.actions;
export default periodSlice.reducer