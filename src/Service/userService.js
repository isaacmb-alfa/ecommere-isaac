import axios from 'axios'

const BASE_URL = import.meta.env.VITE_URL_SERVER;

const registerUserService = (data) => axios.post(`${BASE_URL}/users`, data);
const loginUserService = (data) => axios.post(`${BASE_URL}/login`, data); 
const getAllUsersService = (jwtToken) => axios.get(`${BASE_URL}/users`,{ headers: { Authorization: `Bearer ${jwtToken}` } });
const getMeUserService = (jwtToken) => axios.get(`${BASE_URL}/me`, { headers: { Authorization: `Bearer ${jwtToken}` } });
const updateUserService = (id, data) => axios.put(`${BASE_URL}/users/${id}`, data);


export {
    registerUserService,
    loginUserService,
    getAllUsersService,
    getMeUserService,
    updateUserService
}