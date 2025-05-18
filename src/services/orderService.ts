import { Order } from "../models/Order";
import api from "../interceptors/axiosInterceptors";

const API_URL = import.meta.env.VITE_API_URL;

class OrderService {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await api.get<Order[]>(`${API_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener orders:", error);
      return [];
    }
  }

  async getOrderById(id: number): Promise<Order | null> {
    try {
      const response = await api.get<Order>(`${API_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el order por id ${id}`, error);
      return null;
    }
  }

  async createOrder(order: Omit<Order, "id">): Promise<Order | null> {
    try {
      const response = await api.post<Order>(`${API_URL}/orders`, order);
      return response.data;
    } catch (error) {
      console.error("Error al crear el order:", error);
      return null;
    }
  }

  async updateOrder(id: number, order: Partial<Order>): Promise<Order | null> {
    try {
      const response = await api.put<Order>(`${API_URL}/orders/${id}`, order);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el order con id: ${id}`, error);
      return null;
    }
  }

  async deleteOrder(id: number): Promise<boolean> {
    try {
      await api.delete(`${API_URL}/orders/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar el order con id ${id}`, error);
      return false;
    }
  }
}

export const orderService = new OrderService();