import axios from 'axios';
const ROLE = "http://localhost:3030/role";

const add = async (data) => {
    try{
        const response = await axios.post(`${ROLE}/set`, data);
        return response.data;
    } catch (error){
        console.error('Error adding role:', error);
        throw error;
    }
};

const get = async () => {
    try{
        const response = await axios.get(`${ROLE}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching role:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${ROLE}/getById/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching role by id:', error);
        throw error;
    }
};

const roleServices = { add, get, byId };
export default roleServices;