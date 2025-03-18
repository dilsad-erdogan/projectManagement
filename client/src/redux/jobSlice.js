import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    searchTerm: '',
    filteredData: []
};

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs(state, action) {
            state.jobs = action.payload
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
            state.filteredData = state.jobs.filter(job => job.title.toLowerCase().includes(state.searchTerm.toLowerCase()))
        }
    },
});

export const { setJobs, setSearchTerm } = jobSlice.actions;
export default jobSlice.reducer