import { Product } from "./Product";
import { Restaurant } from "./Restaurant";

export interface Menu {
  id?: number; // Opcional, generado por el backend
  price: number; // Precio del menú
  availability: boolean; // Disponibilidad del menú
  product_id: number;
  restaurant_id?:number;
  product?: Product;
  restaurant?:Restaurant;
}