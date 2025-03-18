import axios from 'axios';
const JOB = "http://localhost:3030/job";

const add = async (data) => {
    try{
        const response = await axios.post(`${JOB}/set`, data);
        return response.data;
    } catch (error){
        console.error('Error adding job:', error);
        throw error;
    }
};

const get = async () => {
    try{
        const response = await axios.get(`${JOB}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching job:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${JOB}/getById/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching job by id:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${JOB}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting job:', error);
        throw error;
    }
};

const updateStartingState = async (id, data) => {
    try{
        const response = await axios.put(`${JOB}/updateStartingState/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating job:', error);
        throw error;
    }
};

const updateCompletionState = async (id, data) => {
    try{
        const response = await axios.put(`${JOB}/updateCompletionState/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating job:', error);
        throw error;
    }
};

const jobServices = { add, get, byId, deleted, updateStartingState, updateCompletionState };
export default jobServices;