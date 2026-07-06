import api from "./axios";

export const deleteCategory = (id) => {
    return api.delete(`/categories/${id}`);
};

export const getCategories = ()=>{
    return api.get("/categories");
}