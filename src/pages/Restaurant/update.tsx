import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Restaurant } from "../../models/Restaurant";

import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import RestaurantFormValidator from "../../components/Restaurants/RestaurantFormValidator";
import { restaurantService } from "../../services/restaurantService";

const UpdateRestaurant = () => {
    const navigate = useNavigate();
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

    const handleUpdateRestaurant = async (theRestaurant: Restaurant) => {
        try {
            const updatedRestaurant = await restaurantService.updateRestaurant(theRestaurant.id || 0, theRestaurant);
            if (updatedRestaurant) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/restaurant/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            console.error('Error al actualizar el restaurant:', error);
        }
    };

    if (!restaurant) return <div>Cargando...</div>;

    return (
        <div>

            <Breadcrumb pageName="Actualizar Restaurant" />
            <RestaurantFormValidator
                handleUpdate={handleUpdateRestaurant}
                mode={2}
                readOnly={false}
                restaurant={restaurant}
            />
        </div>
    );
};

export default UpdateRestaurant;