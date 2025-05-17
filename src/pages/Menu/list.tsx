import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Menu } from "../../models/Menu";
import { menuService } from "../../services/menuService";

import MenuContainer from "../../components/Menu/MenuContainer";

const ListMenu: React.FC = () => {
  const {id_restaurant}=useParams()
  const restaurantId = id_restaurant ? parseInt(id_restaurant) : undefined;
  const navigate = useNavigate();

  const [data, setData] = useState<Menu[]>([]);

  useEffect(() => {

    fetchData();
  }, [id_restaurant]);

  const fetchData = async () => {
    let menus:Menu[]=[];
    if (restaurantId){
        if (!isNaN(restaurantId)) {
                menus = await menuService.getMenusByRestaurantId(restaurantId);
            } else {
                console.error("ID de restaurante inválido:", id_restaurant);
            }
    }else{
        menus = await menuService.getMenus();
    }
    console.log("Menús obtenidos:", menus); // Para depurar
    setData(menus);
  };

  const handleCreate = () => {
    if(restaurantId){
        navigate(`/menu/create/${restaurantId}`);
    } else{
       Swal.fire({
            title: "Error",
            text: "Para crear un menu se debe hacer desde el restaurante",
            icon: "error",
            timer: 3000,
          });
        
    }
    
  };

  const handleView = (id: number) => {
    navigate(`/menu/view/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/menu/update/${id}`);
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Eliminación",
      text: "¿Estás seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await menuService.deleteMenu(id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "Se ha eliminado correctamente el registro",
            icon: "success",
            timer: 3000,
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el registro",
            icon: "error",
            timer: 3000,
          });
        }
      }
    });
  };

  return (
    <MenuContainer restaurantId={restaurantId}>
          
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Listado de Menús</h3>
            <button onClick={handleCreate} className="text-green-600 dark:text-green-500">
              Crear
            </button>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Producto
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Disponible
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    > <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {item.product?.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {item.price}
                      </td>
                      <td className="px-6 py-4">{item.availability ? "Sí" : "No"}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleView(item.id ? item.id : 0)}
                          className="text-blue-600 dark:text-blue-500"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => handleEdit(item.id ? item.id : 0)}
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleDelete(item.id)}
                          className="text-red-600 dark:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </MenuContainer>
  );
};

export default ListMenu;