import { Customer } from "./Customer";
import { Menu } from "./Menu";
import { Motorcycle } from "./Motorcycle";

export interface Order {
    id?: number;
    quantity?: number;
    total_price?: number;
    status?: string;
    customer_id?: number;
    restaurant_id?: number; // Nuevo campo
    menu_id?: number;
    motorcycle_id?: number;
    created_at?: string;
    address?: string; // Por el momento, despues cambiar
    customer?: Customer;
    menu?: Menu
}