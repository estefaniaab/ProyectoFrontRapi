import React from "react";
import RestaurantHeader from "../Restaurants/RestaurantHeader";


interface MenuContainerProps {
  restaurantId?: number;
  children: React.ReactNode;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ restaurantId, children }) => {
  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        {restaurantId && <RestaurantHeader restaurantId={restaurantId} />}
        {children}
      </div>
    </div>
  );
};

export default MenuContainer;