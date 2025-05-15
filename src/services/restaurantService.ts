import axios from "axios";
import { Restaurant } from "../models/Restaurant";
import api from "../interceptors/axiosInterceptors";

const API_URL = import.meta.env.VITE_API_URL + "/restaurants" || "";

class RestaurantService {
    async getRestaurants(): Promise<Restaurant[]> {
        try {
            const response = await api.get<Restaurant[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener restaurants:', error);
            return [];
        }
    }

    async getRestaurantById(id: number): Promise<Restaurant | null> {
        try {
            const response = await api.get<Restaurant>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el restaurant por id ${id}`, error);
            return null;
        }
    }

    async createRestaurant(restaurant: Omit<Restaurant, "id">): Promise<Restaurant | null> {
        try {
            const response = await axios.post<Restaurant>(API_URL, restaurant);
            return response.data;
        } catch (error) {
            console.error('Error al crear el restaurant:', error);
            return null;
        }
    }

    async updateRestaurant(id: number, restaurant: Partial<Restaurant>): Promise<Restaurant | null> {
        try {
            const response = await axios.put<Restaurant>(`${API_URL}/${id}`, restaurant);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el restaurant con id: ${id}`, error);
            return null;
        }
    }

    async deleteRestaurant(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar el restaurant con id ${id}`, error);
            return false;
        }
    }
}

export const restaurantService = new RestaurantService();