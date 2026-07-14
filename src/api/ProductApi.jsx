import api from "./axios";

export const getProducts = (page = 1, limit = 10) => {
    return api.get(`/products?page=${page}&limit=${limit}`);
}

export const getProductById = (id)=>{
    return api.get(`/products/${id}`);
}