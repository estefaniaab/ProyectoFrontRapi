import axios from "axios";
import { Role } from "../models/Role";

const API_URL = import.meta.env.VITE_API_URL + "/roles" || "";

class RolesService {
    async getRole(): Promise<Role[]> {
        try {
            const response = await axios.get<Role[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los roles:", error);
            return [];
        }
    }

    async getRoleById(id: number): Promise<Role | null> {
        try {
            const response = await axios.get<Role>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Rol no encontrado:", error);
            return null;
        }
    }

    async createRole(user: Omit<Role, "id">): Promise<Role | null> {
        try {
            const response = await axios.post<Role>(API_URL, user);
            return response.data;
        } catch (error) {
            console.error("Error al crear rol:", error);
            return null;
        }
    }

    async updateRole(id: number, user: Partial<Role>): Promise<Role | null> {
        try {
            const response = await axios.put<Role>(`${API_URL}/${id}`, user);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar roles:", error);
            return null;
        }
    }

    async deleteRole(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar roles:", error);
            return false;
        }
    }
}

// Exportamos una instancia de la clase para reutilizarla
export const roleService = new RolesService();
