import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    agreements: []
};

const agreementSlice = createSlice({
    name: 'agreements',
    initialState,
    reducers: {
        setAgreements(state, action) {
            state.agreements = action.payload
        }
    },
});

export const { setAgreements } = agreementSlice.actions;
export default agreementSlice.reducer