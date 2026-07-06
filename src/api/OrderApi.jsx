import api from "./axios";

export const getOrders = ()=>{
    return api.get("/orders/my")
};
