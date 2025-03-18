import axios from 'axios';
const PERIOD = "http://localhost:3030/period";

const add = async (data) => {
    try{
        const response = await axios.post(`${PERIOD}/set`, data);
        return response.data;
    } catch (error){
        console.error('Error adding period:', error);
        throw error;
    }
};

const get = async () => {
    try{
        const response = await axios.get(`${PERIOD}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching period:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${PERIOD}/getById/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching period by id:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${PERIOD}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting period:', error);
        throw error;
    }
};

const updateContract = async (id, data) => {
    try{
        const response = await axios.put(`${PERIOD}/updateContract/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating period:', error);
        throw error;
    }
};

const updateRevised = async (id, data) => {
    try{
        const response = await axios.put(`${PERIOD}/updateRevised/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating period:', error);
        throw error;
    }
};

const updateRevisedState = async (id, data) => {
    try{
        const response = await axios.put(`${PERIOD}/updateRevisedState/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating period:', error);
        throw error;
    }
};

const updateApprovalState = async (id, data) => {
    try{
        const response = await axios.put(`${PERIOD}/updateApprovalState/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating period:', error);
        throw error;
    }
};

const auctionServices = { add, get, byId, deleted, updateContract, updateRevised, updateRevisedState, updateApprovalState };
export default auctionServices;