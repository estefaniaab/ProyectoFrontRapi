import { Address } from "../models/Address";
import api from "../interceptors/axiosInterceptors";

const API_URL = import.meta.env.VITE_API_URL + "/addresses";

class AddressService {
    async getAddresses(): Promise<Address[]> {
        try {
            const response = await api.get<Address[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener las direcciones:", error);
            return [];
        }
    }

    async getAddressById(id: number): Promise<Address | null> {
        try {
            const response = await api.get<Address>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener la dirección con id ${id}`, error);
            return null;
        }
    }

    async getAddressByOrderId(orderId: number): Promise<Address | null> {
        try {
            // Ajusta la URL según tu endpoint real
            const response = await api.get<Address[]>(`${API_URL}/${orderId}/order`);
            if (response.data && response.data.length > 0) {
                return response.data[0]; // Tomamos la primera dirección de la lista
            } else {
                return null;
            }
        } catch (error) {
            console.log(`Error al obtener la dirección para la orden con ID ${orderId}`, error);
            return null;
        }
    }

    async createAddress(address: Omit<Address, "id" | "order">): Promise<Address | null> {
        try {
            const response = await api.post<Address>(API_URL, address);
            return response.data;
        } catch (error) {
            console.error("Error al crear la dirección:", error);
            return null;
        }
    }

    async updateAddress(id: number, address: Partial<Address>): Promise<Address | null> {
        try {
            const response = await api.put<Address>(`${API_URL}/${id}`, address);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la dirección con id: ${id}`, error);
            return null;
        }
    }

    async deleteAddress(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar la dirección con id ${id}`, error);
            return false;
        }
    }
}

export const addressService = new AddressService();