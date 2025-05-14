import axios from "axios";
import { Motorcycle } from "../models/Motorcycle";
import api from "../interceptors/axiosInterceptors";

const API_URL = import.meta.env.VITE_API_URL + "/motorcycles" || "";

class MotorcycleService {
    async getMotorcycles(): Promise<Motorcycle[]> {
        try {
            const response= await api.get<Motorcycle[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener motorcycles:', error);
            return [];
        }
    }
    async getMotorcycleById(id:number): Promise<Motorcycle | null> {
        try {
            const response = await api.get<Motorcycle>(`${API_URL}/${id}`);
            return response.data
        } catch (error) {
            console.error(`Error al obtener la motorcycle por id ${id}`, error );
            return null;
        }
    }

    async createMotorcycle(motorcycle: Omit<Motorcycle, "id">): Promise<Motorcycle | null> {
        try {
            const response = await axios.post<Motorcycle>(API_URL, motorcycle);
            return response.data;
        } catch (error) {
            console.error('Error al crear la motorcycle:', error);
            return null
        }
    }
    async updateMotorcycle(id:number, motorcycle: Partial<Motorcycle>): Promise<Motorcycle | null> {
        try {
            const response = await axios.put<Motorcycle>(`${API_URL}/${id}`, motorcycle);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la motorcycle con id: ${id}`, error);
            return null;
        }
    }
    async deleteMotorcycle(id:number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar la motorcycle con id ${id}, `, error);
            return false
        }
    }
}
export const motorcycleService = new MotorcycleService();