import axios from 'axios';

const API_URL = 'http://localhost:5000';

const handleApiError = (error) => {
    if (error.response) {
        console.error('Server responded with error:', error.response.status);
        console.error('Error data:', error.response.data);
        return error.response.data || { message: 'An error occurred' };
    }
    else if (error.request) {

        console.error('No response received:', error.request);
        return { message: 'No response from server' };
    }
    else {
        console.error('Request error:', error.message);
        return { message: error.message || 'Request setup error' };
    }
};

export const getAllInvoices = async () => {
    try {
        const response = await axios.get(`${API_URL}/invoice`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const saveInvoice = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/invoice`, payload);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteInvoice = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/invoice/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};