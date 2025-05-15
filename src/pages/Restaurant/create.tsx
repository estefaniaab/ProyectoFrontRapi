import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import RestaurantFormValidator from "../../components/Restaurants/RestaurantFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import { restaurantService } from "../../services/restaurantService";

const CreateRestaurant = () => {
    const navigate = useNavigate();

    const handleCreateRestaurant = async (restaurant: any) => {
        try {
            const createdRestaurant = await restaurantService.createRestaurant(restaurant);
            if (createdRestaurant) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate('/list/restaurant');
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            console.error('Error al crear el restaurant:', error);
        }
    };

    return (
        <div>
            <h2 className="bg-meta-1">Create Restaurant</h2>
            <RestaurantFormValidator
                handleCreate={handleCreateRestaurant}
                mode={1}
                readOnly={false}
            />
        </div>
    );
};

export default CreateRestaurant;