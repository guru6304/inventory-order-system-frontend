import api from "./axios";

export const getOrders = () => {
    return api.get("/orders/my");
};

export const createOrder = (items) => {
    return api.post("/orders", { items });
};