import { configureStore } from "@reduxjs/toolkit";
import agreementSlice from "./agreementSlice";
import auctionSlice from "./auctionSlice";
import jobSlice from "./jobSlice";
import periodSlice from "./periodSlice";
import roleSlice from "./roleSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        agreement: agreementSlice,
        auction: auctionSlice,
        job: jobSlice,
        period: periodSlice,
        role: roleSlice,
        user: userSlice
    }
});

export default store;