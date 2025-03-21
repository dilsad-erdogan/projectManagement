import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    selectUser: [],
    searchResults: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        searchUsers(state, action) {
            const searchTerm = action.payload.toLowerCase();
            state.searchResults = state.users.filter((user) =>
                user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
            );
        },
        login: (state, action) => {
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.selectUser = action.payload
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.selectUser = false
        }
    },
});

export const { setUsers, searchUsers, login, logout } = usersSlice.actions;
export default usersSlice.reducer;