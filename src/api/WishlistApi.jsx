import api from "./axios";

export const addToWishlist = (productId) => {
    return api.post("/wishlist", {
        product_id: productId
    });
};

export const getWishlist = () => {
    return api.get("/wishlist");
};

export const deleteWishlist = (productId) => {
    return api.delete(`/wishlist/${productId}`);
};