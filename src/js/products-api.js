// Функції для роботи з бекендом
import axios from "axios";

const endPoints = [
    "https://dummyjson.com/docs/products",
    "https://dummyjson.com/products?limit=12&skip=",
    "https://dummyjson.com/products/",
    "https://dummyjson.com/products/search?q=",
    "https://dummyjson.com/products/category-list",
    "https://dummyjson.com/products/category/"
]

export async function getCategories() {
    const response = await axios.get(endPoints[4]);
    return response.data;
}

export async function getProducts(page) {
    const response = await axios.get(endPoints[1] + `${(page - 1) * 12}`);
    return response.data.products;
}

export async function getProductsByCategories(page, category) {
    const response = await axios.get(endPoints[5] + category);
    return (response.data.products.slice(((page - 1) * 12), page * 12));
}

export async function getProductById(id) {
    const response = await axios.get(endPoints[2] + id);
    return response.data;
}

export async function getProductByName(page, name) {
    const response = await axios.get(endPoints[3] + name);
    return (response.data.products.slice(((page - 1) * 12), page * 12));
}