import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

const UpdateOrder: React.FC = () => {
    const navigate = useNavigate();
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
            const menusList = await menuService.getMenus();
            setMenus(menusList);
        };

        fetchOrderData();
        fetchAppData();
    }, [id]);

    const handleUpdateOrder = async (updatedOrder: Order) => {
        try {
            const result = await orderService.updateOrder(updatedOrder.id!, updatedOrder);
            if (result) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente la orden",
                    icon: "success",
                    timer: 3000,
                });
                navigate("/order/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al actualizar la orden",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar la orden",
                icon: "error",
                timer: 3000,
            });
        }
    };

    const handleRestaurantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRestaurantId(parseInt(event.target.value));
    };

    if (!order) {
        return <div>Cargando detalles de la orden...</div>;
    }

    return (
        <div>
            <Breadcrumb pageName={`Actualizar Orden #${order.id}`} />
            <OrderFormValidator
                mode={2}
                readOnly={false}
                order={order}
                customers={customers}
                restaurants={restaurants}
                menus={menus}
                motorcycles={motorcycles}
                handleUpdate={handleUpdateOrder}
                selectedRestaurantId={selectedRestaurantId}
                onRestaurantChange={handleRestaurantChange}
            />
        </div>
    );
};

export default UpdateOrder;