import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Menu } from "../../models/Menu";
import { menuService } from "../../services/menuService";

import Breadcrumb from "../../components/Breadcrumb";
import MenuFormValidator from "../../components/Menu/MenuFormValidator";
import MenuContainer from "../../components/Menu/MenuContainer";

const UpdateMenu: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [menu, setMenu] = useState<Menu | null>(null);

  

  useEffect(() => {
    const fetchMenu = async () => {
      if (!id) return;
      const menuData = await menuService.getMenuById(parseInt(id));
      setMenu(menuData);
    };

    fetchMenu();
  }, [id]);

  const handleUpdateMenu = async (theMenu: Menu) => {
    try {
      const updatedMenu = await menuService.updateMenu(theMenu.id || 0, theMenu);
      if (updatedMenu) {
        Swal.fire({
          title: "Completado",
          text: "Se ha actualizado correctamente el menú",
          icon: "success",
          timer: 3000,
        });
        navigate(menu?.restaurant_id ? `/menu/list/${menu.restaurant_id}` : "/menu/list");
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al actualizar el menú",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el menú",
        icon: "error",
        timer: 3000,
      });
    }
  };

  if (!menu) {
    return <div>Cargando...</div>;
  }

  return (
    <MenuContainer restaurantId={menu.restaurant_id}>
      <Breadcrumb pageName="Actualizar Menú" />
      <MenuFormValidator handleUpdate={handleUpdateMenu} mode={2} readOnly={false} menu={menu} />
    </MenuContainer>
  );
};

export default UpdateMenu;