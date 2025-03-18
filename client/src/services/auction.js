import axios from 'axios';
const AUCTION = "http://localhost:3030/auction";

const add = async (data) => {
    try{
        const response = await axios.post(`${AUCTION}/set`, data);
        return response.data;
    } catch (error){
        console.error('Error adding auction:', error);
        throw error;
    }
};

const get = async () => {
    try{
        const response = await axios.get(`${AUCTION}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching auction:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${AUCTION}/getById/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching auction by id:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${AUCTION}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting auction:', error);
        throw error;
    }
};

const updateApproval = async (id, data) => {
    try{
        const response = await axios.put(`${AUCTION}/updateApproval/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating auction:', error);
        throw error;
    }
};

const auctionServices = { add, get, byId, deleted, updateApproval };
export default auctionServices;