import axios from "axios";
import { Driver } from "../models/Driver";
import api from "../interceptors/axiosInterceptors";

const API_URL = import.meta.env.VITE_API_URL + "/drivers" || "";

class DriverService {
    async getDrivers(): Promise<Driver[]> {
        try {
            const response = await api.get<Driver[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener drivers:', error);
            return [];
        }
    }

    async getDriverById(id: number): Promise<Driver | null> {
        try {
            const response = await api.get<Driver>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el driver por id ${id}`, error);
            return null;
        }
    }

    async createDriver(driver: Omit<Driver, "id">): Promise<Driver | null> {
        try {
            const response = await axios.post<Driver>(API_URL, driver);
            return response.data;
        } catch (error) {
            console.error('Error al crear el driver:', error);
            return null;
        }
    }

    async updateDriver(id: number, driver: Partial<Driver>): Promise<Driver | null> {
        try {
            const response = await axios.put<Driver>(`${API_URL}/${id}`, driver);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el driver con id: ${id}`, error);
            return null;
        }
    }

    async deleteDriver(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar el driver con id ${id}`, error);
            return false;
        }
    }
}

export const driverService = new DriverService();