import axios from "axios";

const API = axios.create({
    baseURL: "https://fakestoreapi.in/api/",
});

export const fetchProducts = async () => {
    try {
        const response = await API.get("/products");
        return response.data.products || [];
    } catch (error) {
        console.error("API fetch error:", error);
        return [];
    }
};

export default API;  // <-- Add this line
