import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Restaurant } from "../../models/Restaurant";

import Breadcrumb from "../../components/Breadcrumb";
import RestaurantFormValidator from "../../components/Restaurants/RestaurantFormValidator";
import { restaurantService } from "../../services/restaurantService";

const ViewRestaurantPage = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) return;
            const restaurantData = await restaurantService.getRestaurantById(parseInt(id));
            setRestaurant(restaurantData);
        };
        fetchRestaurant();
    }, [id]);

    if (!restaurant) return <div className="p-4 text-gray-600">Cargando...</div>;

    return (
        <>
            <Breadcrumb pageName="Ver Restaurante" />
            <RestaurantFormValidator mode={3} restaurant={restaurant} readOnly={true} />
        </>
    );
};

export default ViewRestaurantPage;