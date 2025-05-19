import React, { useState, useEffect } from "react";
import { Restaurant } from "../../models/Restaurant";
import { restaurantService } from "../../services/restaurantService";


interface RestaurantHeaderProps {
  restaurantId: number;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurantId }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (restaurantId) {
        const data = await restaurantService.getRestaurantById(restaurantId);
        setRestaurant(data);
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  if (!restaurant) {
    return <div className="mb-6 p-4 text-gray-600">Cargando detalles del restaurante...</div>;
  }

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-md text-center ">
      <h2 className="text-2xl font-bold text-gray-800">
        Restaurante: {restaurant.name}
      </h2>
      <p className="text-lg text-gray-600">
        Teléfono: {restaurant.phone}
      </p>
    </div>
  );
};

export default RestaurantHeader;