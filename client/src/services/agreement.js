import axios from 'axios';
const AGREEMENT = "http://localhost:3030/agreement";

const add = async (data) => {
    try{
        const response = await axios.post(`${AGREEMENT}/set`, data);
        return response.data;
    } catch (error){
        console.error('Error adding agreement:', error);
        throw error;
    }
};

const get = async () => {
    try{
        const response = await axios.get(`${AGREEMENT}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching agreement:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${AGREEMENT}/getById/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching agreement by id:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${AGREEMENT}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting agreement:', error);
        throw error;
    }
};

const agreementServices = { add, get, byId, deleted };
export default agreementServices;