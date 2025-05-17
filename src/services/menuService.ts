
import { Menu } from "../models/Menu";
import api from "../interceptors/axiosInterceptors";

const API_URL = import.meta.env.VITE_API_URL;

class MenuService {
  async getMenus(): Promise<Menu[]> {
    try {
      const response = await api.get<Menu[]>(`${API_URL}/menus`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener menus:", error);
      return [];
    }
  }
  async getMenusByRestaurantId(restaurantId: number): Promise<Menu[]> {
        try {
            const response = await api.get<Menu[]>(`${API_URL}/restaurants/${restaurantId}/menus`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener los menús del restaurante ${restaurantId}:`, error);
            return [];
        }
    }

  async getMenuById(id: number): Promise<Menu | null> {
    try {
      const response = await api.get<Menu>(`${API_URL}/menus/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el menu por id ${id}`, error);
      return null;
    }
  }

  async createMenu(menu: Omit<Menu, "id">): Promise<Menu | null> {
    try {
      const response = await api.post<Menu>(`${API_URL}/menus`, menu);
      return response.data;
    } catch (error) {
      console.error("Error al crear el menu:", error);
      return null;
    }
  }

  async updateMenu(id: number, menu: Partial<Menu>): Promise<Menu | null> {
    try {
      const response = await api.put<Menu>(`${API_URL}/menus/${id}`, menu);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el menu con id: ${id}`, error);
      return null;
    }
  }

  async deleteMenu(id: number): Promise<boolean> {
    try {
      await api.delete(`${API_URL}/menus/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar el menu con id ${id}`, error);
      return false;
    }
  }
}

export const menuService = new MenuService();