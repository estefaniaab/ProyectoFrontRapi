import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../../models/Menu";
import { menuService } from "../../services/menuService";

import Breadcrumb from "../../components/Breadcrumb";
import MenuFormValidator from "../../components/Menu/MenuFormValidator";

const ViewMenu: React.FC = () => {
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

  if (!menu) {
    return <div className="p-4 text-gray-600">Cargando...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Ver Menú" />
      <MenuFormValidator mode={2} menu={menu} readOnly={true} />
    </>
  );
};

export default ViewMenu;