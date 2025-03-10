import axios from 'axios';
const BASE_URL = import.meta.env.VITE_URL_SERVER; // URL de la API

// Obtener todos los productos
export const getProductsService = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/items`);
        console.log('Products:', response.data);
        
        return response;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Actualizar un producto
export const updateProductService = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/items/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Agregar un nuevo producto
export const addProductService = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/items`, data);
        return response;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};
// Eliminar un producto
export const deleteProductService = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/items/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};