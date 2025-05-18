import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Order } from "../../models/Order";
import { orderService } from "../../services/orderService";
import Breadcrumb from "../../components/Breadcrumb";
import OrderFormValidator from "../../components/Orders/OrderFormValidator";
import { Customer } from "../../models/Customer";
import { Restaurant } from "../../models/Restaurant";
import { Menu } from "../../models/Menu";
import { Motorcycle } from "../../models/Motorcycle";
import { customerService } from "../../services/customerService";
import { restaurantService } from "../../services/restaurantService";
import { menuService } from "../../services/menuService";
import { motorcycleService } from "../../services/motorcycleServices";

const ViewOrder: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | undefined>();

    useEffect(() => {
        const fetchOrderData = async () => {
            if (id) {
                const orderData = await orderService.getOrderById(parseInt(id));
                setOrder(orderData);
                // Si la orden tiene un restaurantId, lo seteamos para filtrar los menús (aunque esté en readOnly)
                setSelectedRestaurantId(orderData?.menu?.restaurant_id);
            }
        };

        const fetchAppData = async () => {
            const customersList = await customerService.getCustomers();
            setCustomers(customersList);
            const restaurantsList = await restaurantService.getRestaurants();
            setRestaurants(restaurantsList);
            const motorcyclesList = await motorcycleService.getMotorcycles();
            setMotorcycles(motorcyclesList);
            const menusList = await menuService.getMenus(); // Cargamos todos los menús para visualización
            setMenus(menusList);
        };

        fetchOrderData();
        fetchAppData();
    }, [id]);

    if (!order) {
        return <div className="p-4 text-gray-600">Cargando detalles de la orden...</div>;
    }

    return (
        <div>
            <Breadcrumb pageName={`Ver Orden #${order.id}`} />
            <OrderFormValidator
                mode={3} // Modo visualización
                readOnly={true}
                order={order}
                customers={customers}
                restaurants={restaurants}
                menus={menus}
                motorcycles={motorcycles}
                selectedRestaurantId={selectedRestaurantId}
            />
        </div>
    );
};

export default ViewOrder;