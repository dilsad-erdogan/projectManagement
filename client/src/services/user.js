import axios from 'axios';
const USER = "http://localhost:3030/user";

const login = async (userData) => {
    try{
        const response = await axios.post(`${USER}/login`, userData);
        return response.data;
    } catch (error){
        console.error('Login error:', error);
        throw error.response.data;
    }
};

const register = async (userData) => {
    try{
        const response = await axios.post(`${USER}/register`, userData);
        return response.data;
    } catch(error) {
        console.error('Register error:', error);
        throw error.response.data;
    }
};

const get = async () => {
    try{
        const response = await axios.get(`${USER}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching user:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${USER}/getById/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching user by id:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${USER}/deleteUser/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting user:', error);
        throw error;
    }
};

const updateRole = async (id, data) => {
    try{
        const response = await axios.put(`${USER}/updateRole/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating role:', error);
        throw error;
    }
};

const updateName = async (id, data) => {
    try{
        const response = await axios.put(`${USER}/updateName/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating name:', error);
        throw error;
    }
};

const updateSurname = async (id, data) => {
    try{
        const response = await axios.put(`${USER}/updateSurname/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating surname:', error);
        throw error;
    }
};

const updateEmail = async (id, data) => {
    try{
        const response = await axios.put(`${USER}/updateEmail/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating email:', error);
        throw error;
    }
};

const updatePhone = async (id, data) => {
    try{
        const response = await axios.put(`${USER}/updatePhone/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating phone:', error);
        throw error;
    }
};

const updateAdjective = async (id, data) => {
    try{
        const response = await axios.put(`${USER}/updateAdjective/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating adjective:', error);
        throw error;
    }
};

const updateFeatures = async (id, data) => {
    try{
        const response = await axios.put(`${USER}/updateFeatures/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating features:', error);
        throw error;
    }
};

const updatePassword = async (id, data) => {
    try{
        const response = await axios.put(`${USER}/updatePassword/${id}`, data);
        return response.data;
    } catch (error){
        console.error('Error updating password:', error);
        throw error;
    }
};

const userServices = { register, login, get, byId, deleted, updateRole, updateName, updateSurname, updateEmail, updatePhone, updateAdjective, updateFeatures, updatePassword };
export default userServices;