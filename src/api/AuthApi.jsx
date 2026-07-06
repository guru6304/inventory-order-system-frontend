import api from "../api/axios";

export const login = (data)=>{
    return api.post("/auth/login",data);
};
export const register = (data)=>{
    return api.post("/auth/register",data);
};
export const getMe = (data)=>{
    return api.get("/auth/me");
};

