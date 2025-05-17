import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { Order } from "../../models/Order";
import { orderService } from "../../services/orderService";
import OrderFormValidator from "../../components/Orders/OrderFormValidator";
import { Customer } from "../../models/Customer";
import { Menu } from "../../models/Menu";
import { Motorcycle } from "../../models/Motorcycle";
import { Restaurant } from "../../models/Restaurant"; // Importa el modelo de Restaurant
import { customerService } from "../../services/customerService";
import { menuService } from "../../services/menuService";
import { motorcycleService } from "../../services/motorcycleServices";
import { restaurantService } from "../../services/restaurantService"; // Importa el servicio de Restaurant

const CreateOrder: React.FC = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | undefined>();

    useEffect(() => {
        const fetchInitialData = async () => {
            const customersList = await customerService.getCustomers();
            setCustomers(customersList);
            const restaurantsList = await restaurantService.getRestaurants();
            setRestaurants(restaurantsList);
            const motorcyclesList = await motorcycleService.getMotorcycles();
            setMotorcycles(motorcyclesList);
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchMenusByRestaurant = async () => {
            if (selectedRestaurantId) {
                console.log("Fetching menus for restaurant ID:", selectedRestaurantId); // Agrega este log
                const menusList = await menuService.getMenusByRestaurantId(selectedRestaurantId);
                console.log("Menus fetched:", menusList); // Agrega este log
                setMenus(menusList);
            } else {
                setMenus([]); // Limpiar los menús si no hay restaurante seleccionado
            }
        };

        fetchMenusByRestaurant();
    }, [selectedRestaurantId]);

    const handleRestaurantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const restaurantId = parseInt(event.target.value);
        setSelectedRestaurantId(isNaN(restaurantId) ? undefined : restaurantId);
        console.log("Selected restaurant ID:", restaurantId); // Agrega este log
    };

    const handleCreateOrder = async (orderData: Omit<Order, "id">) => {
        try {
            const createdOrder = await orderService.createOrder(orderData);
            if (createdOrder) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado la orden correctamente",
                    icon: "success",
                    timer: 3000,
                });
                navigate("/order/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al crear la orden",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            console.error("Error al crear la orden:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear la orden",
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <Breadcrumb pageName="Crear Orden" />
            <OrderFormValidator
                handleCreate={handleCreateOrder}
                mode={1}
                readOnly={false}
                customers={customers}
                restaurants={restaurants}
                menus={menus}
                motorcycles={motorcycles}
                selectedRestaurantId={selectedRestaurantId}
                onRestaurantChange={handleRestaurantChange} // Nueva prop
            />
        </div>
    );
};

export default CreateOrder;