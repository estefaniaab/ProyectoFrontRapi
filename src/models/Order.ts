export interface Order {
    id?: number;
    quantity?: number;
    total_price?: number;
    status?: string;
    customer_id?: number;
    restaurant_id?: number; // Nuevo campo
    menu_id?: number;
    motorcycle_id?: number;
    // customer?: Customer;
    // motorcycle?: Motorcycle;
}