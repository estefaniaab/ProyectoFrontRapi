import axios from "axios";
import { Permission } from "../models/Permission";

const API_URL = import.meta.env.VITE_API_URL + "/permissions" || "";

class PermissionService {
    async getPermission(): Promise<Permission[]> {
        try {
            const response = await axios.get<Permission[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los permisos:", error);
            return [];
        }
    }

    async getPermissionById(id: number): Promise<Permission | null> {
        try {
            const response = await axios.get<Permission>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Permiso no encontrado:", error);
            return null;
        }
    }

    async createPermission(user: Omit<Permission, "id">): Promise<Permission | null> {
        try {
            const response = await axios.post<Permission>(API_URL, user);
            return response.data;
        } catch (error) {
            console.error("Error al crear permiso:", error);
            return null;
        }
    }

    async updatePermission(id: number, user: Partial<Permission>): Promise<Permission | null> {
        try {
            const response = await axios.put<Permission>(`${API_URL}/${id}`, user);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar permisos:", error);
            return null;
        }
    }

    async deletePermission(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar permiso:", error);
            return false;
        }
    }
}

// Exportamos una instancia de la clase para reutilizarla
export const permissionService = new PermissionService();
