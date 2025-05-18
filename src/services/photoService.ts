import api from "../interceptors/axiosInterceptors";
import { Photo } from "../models/Photo";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class PhotoService {
    // Obtener todas las fotos
    async getPhotos(): Promise<Photo[]> {
        try {
            const response = await api.get<Photo[]>(`${API_URL}/photos`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener las fotos:", error);
            return [];
        }
    }

    // Obtener una foto por ID
    async getPhotoById(id: number): Promise<Photo | null> {
        try {
            const response = await api.get<Photo>(`${API_URL}/photos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener la foto con ID ${id}:`, error);
            return null;
        }
    }

    async getPhotosByIssueId(issueId: number): Promise<Photo[]> {
        try {
            const response = await api.get<Photo[]>(`${API_URL}/issues/${issueId}/photos`);
            return response.data.map(photo => ({
                ...photo,
                taken_at: new Date(photo.taken_at)
            }));
        } catch (error) {
            console.error(`Error al obtener las fotos para la avería ${issueId}:`, error);
            return [];
        }
    }

    // Crear una nueva foto
    async createPhoto(photo: Omit<Photo, "id">): Promise<Photo | null> {
        try {
            const response = await api.post<Photo>(`${API_URL}/photos`, photo);
            return response.data;
        } catch (error) {
            console.error("Error al crear la foto:", error);
            return null;
        }
    }

    // Actualizar una foto existente
    async updatePhoto(id: number, photo: Partial<Photo>): Promise<Photo | null> {
        try {
            const response = await api.put<Photo>(`${API_URL}/photos/${id}`, photo);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la foto con ID ${id}:`, error);
            return null;
        }
    }

    // Eliminar una foto por ID
    async deletePhoto(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/photos/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar la foto con ID ${id}:`, error);
            return false;
        }
    }
    async uploadPhoto(formData: FormData): Promise<Photo | null> {
    try {
        const response = await api.post<Photo>(`${API_URL}/photos/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al subir la foto:", error);
        return null;
    }
}
}

export const photoService = new PhotoService();