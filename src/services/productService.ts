import axios from "axios";
import api from "../interceptors/axiosInterceptors";
import { Product } from "../models/Product";

const API_URL = import.meta.env.VITE_API_URL + "/products";

class ProductService {
    async getProducts(): Promise<Product[]> {
        try {
            const response = await api.get<Product[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener productos:", error);
            return [];
        }
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            const response = await api.get<Product>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el producto con id ${id}:`, error);
            return null;
        }
    }

    async createProduct(product: Omit<Product, "id">): Promise<Product | null> {
        try {
            const response = await api.post<Product>(API_URL, product);
            return response.data;
        } catch (error) {
            console.error("Error al crear el producto:", error);
            return null;
        }
    }

    async updateProduct(id: number, product: Partial<Product>): Promise<Product | null> {
        try {
            const response = await api.put<Product>(`${API_URL}/${id}`, product);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el producto con id ${id}:`, error);
            return null;
        }
    }

    async deleteProduct(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar el producto con id ${id}:`, error);
            return false;
        }
    }
}

export const productService = new ProductService();