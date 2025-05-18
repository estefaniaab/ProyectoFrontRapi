import api from "../interceptors/axiosInterceptors";
import { Issue } from "../models/Issue";

const API_URL = import.meta.env.VITE_API_URL;

class IssueService {
    async getIssues(): Promise<Issue[]> {
        try {
            const response = await api.get<Issue[]>(`${API_URL}/issues`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener las averías:", error);
            return [];
        }
    }
    async getIssuesByMotorcycleId(motorcycleId: number): Promise<Issue[]> {
        if (!motorcycleId || motorcycleId <= 0 || isNaN(motorcycleId)) {
        console.error(`ID de motocicleta inválido: ${motorcycleId}`);
        return [];
        }
        try {
        const response = await api.get(`${API_URL}/motorcycles/${motorcycleId}/issues`);
        return response.data;
        } catch (error) {
        console.error(`Error al obtener las averías para la motocicleta ${motorcycleId}:`, error);
        return [];
        }
    }

    async getIssueById(id: number): Promise<Issue | null> {
        try {
            const response = await api.get<Issue>(`${API_URL}/issues/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener la avería con id ${id}:`, error);
            return null;
        }
    }

    async createIssue(issue: Omit<Issue, "id">): Promise<Issue | null> {
        try {
            const response = await api.post<Issue>(`${API_URL}/issues`, issue);
            return response.data;
        } catch (error) {
            console.error("Error al crear la avería:", error);
            return null;
        }
    }

    async updateIssue(id: number, issue: Partial<Issue>): Promise<Issue | null> {
        try {
            const response = await api.put<Issue>(`${API_URL}/issues/${id}`, issue);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la avería con id ${id}:`, error);
            return null;
        }
    }

    async deleteIssue(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/issues/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar la avería con id ${id}:`, error);
            return false;
        }
    }
}

export const issueService = new IssueService();