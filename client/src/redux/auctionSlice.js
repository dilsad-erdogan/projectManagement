import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auctions: []
};

const auctionSlice = createSlice({
    name: 'auctions',
    initialState,
    reducers: {
        setAuctions(state, action) {
            state.auctions = action.payload
        }
    },
});

export const { setAuctions } = auctionSlice.actions;
export default auctionSlice.reducer