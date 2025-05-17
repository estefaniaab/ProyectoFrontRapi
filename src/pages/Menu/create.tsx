import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { Menu } from "../../models/Menu";

import { menuService } from "../../services/menuService";

import MenuFormValidator from "../../components/Menu/MenuFormValidator";
import MenuContainer from "../../components/Menu/MenuContainer";

const CreateMenu: React.FC = () => {
    const navigate = useNavigate();
    const { id_restaurant } = useParams<{ id_restaurant?: string }>();
    const restaurantId = id_restaurant ? parseInt(id_restaurant) : undefined;
    
    const handleCreateMenu = async (menu: Omit<Menu, "id">) => {
        try {
            const createdMenu = await menuService.createMenu(menu);
            if (createdMenu) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el menú",
                    icon: "success",
                    timer: 3000,
                });
                navigate(restaurantId ? `/menu/list/${restaurantId}` : "/menu/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al crear el menú",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            console.error("Error al crear el menú:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear el menú",
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <MenuContainer restaurantId={restaurantId}>
            <Breadcrumb pageName="Crear Menú" />
            <MenuFormValidator
                handleCreate={handleCreateMenu}
                mode={1}
                readOnly={false}
                restaurantId={restaurantId}
                
            />
        </MenuContainer>
    );
};

export default CreateMenu;