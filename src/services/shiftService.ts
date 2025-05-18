// src/services/shiftService.ts
import axios from "axios";
import { Shift } from "../models/Shift";
import api from "../interceptors/axiosInterceptors";

const API_URL = import.meta.env.VITE_API_URL + "/shifts" || "";

class ShiftService {
  async getShifts(): Promise<Shift[]> {
    try {
      const response = await api.get<Shift[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      return [];
    }
  }

  async getShiftById(id: number): Promise<Shift | null> {
    try {
      const response = await api.get<Shift>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el turno por id ${id}`, error);
      return null;
    }
  }

  // src/services/shiftService.ts (fragmento relevante)
    async createShift(shift: Omit<Shift, "id">): Promise<Shift | null> {
        try {
            const response = await api.post<Shift>(API_URL, shift);
            return response.data; // El backend debe devolver un Shift con id
        } catch (error) {
            console.error("Error al crear el turno:", error);
            return null;
        }
    }

  async updateShift(id: number, shift: Partial<Shift>): Promise<Shift | null> {
    try {
      const response = await api.put<Shift>(`${API_URL}/${id}`, shift);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el turno con id ${id}`, error);
      return null;
    }
  }

  async deleteShift(id: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar el turno con id ${id}`, error);
      return false;
    }
  }
}

export const shiftService = new ShiftService();