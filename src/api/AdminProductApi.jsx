import api from "./axios";

export const deleteProduct = (id)=>{
    return api.delete(`/products/${id}`);
}

export const createProduct = (formData) => {
    return api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};