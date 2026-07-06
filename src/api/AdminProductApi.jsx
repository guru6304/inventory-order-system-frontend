import api from "./axios";

export const deleteProduct = (id)=>{
    return api.delete(`/products/${id}`);
}
