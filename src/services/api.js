import axios from "axios";

const API = axios.create({
    baseURL: "https://fakestoreapi.com",
});

export const fetchProducts = async () => {
    try {
        const response = await API.get("/products");
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("API fetch error:", error);
        return [];
    }
};

export default API;
