import { Order } from "./Order";

export interface Address {
    id?: number;
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    aditional_info?: string;
    order_id?: number,
    order?: Order,
}