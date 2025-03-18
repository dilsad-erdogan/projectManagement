import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roles: []
};

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRoles(state, action) {
            state.roles = action.payload
        }
    },
});

export const { setRoles } = roleSlice.actions;
export default roleSlice.reducer