import axios from "axios";
import { Customer } from "../models/Customer";
import api from "../interceptors/axiosInterceptors";

const API_URL = import.meta.env.VITE_API_URL + "/customers" || "";

class CustomerService {
    async getCustomers(): Promise<Customer[]> {
        try {
            const response = await api.get<Customer[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener customers:', error);
            return [];
        }
    }

    async getCustomerById(id:number): Promise<Customer | null> {
        try {
            const response = await api.get<Customer>(`${API_URL}/${id}`);
            return response.data
        } catch (error) {
            console.error(`Error al obtener el customer por id ${id}`, error );
            return null;
        }
    }

    async createCustomer(customer: Omit<Customer, "id">): Promise<Customer | null> {
        try {
            const response = await axios.post<Customer>(API_URL, customer);
            return response.data;
        } catch (error) {
            console.error('Error al crear el customer:', error);
            return null
        }
    }

    async updateCustomer(id:number, user: Partial<Customer>): Promise<Customer | null> {
        try {
            const response = await axios.put<Customer>(`${API_URL}/${id}`, user);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el usuario con id: ${id}`, error);
            return null;
        }
    }

    async deleteCustomer(id:number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al elimar el usuario con id ${id}, `, error);
            return false
        }
    }
}

// Exportamos una instancia de clase para poder reutilizar
export const customerService = new CustomerService();