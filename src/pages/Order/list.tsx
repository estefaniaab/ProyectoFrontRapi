import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Order } from "../../models/Order";
import { orderService } from "../../services/orderService";

const ListOrder: React.FC = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const ordersList = await orderService.getOrders();
        console.log("Ordenes obtenidas", ordersList);
        setOrders(ordersList);
    } catch (error) {
        console.error("Error al obtener las ordenes: ", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al cargar las órdenes",
            icon: "error",
            timer: 3000,
        });
    }
  };


  const handleCreate = () => {
    navigate(`/order/create`);
  };

  const handleView = (id: number) => {
    navigate(`/order/view/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/order/update/${id}`);
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
        const success = await orderService.deleteOrder(id);
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
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Listado de ordenes</h3>
            <button onClick={handleCreate} className="text-green-600 dark:text-green-500">
              Crear 
            </button>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Cantidad</th>
                    <th scope="col" className="px-6 py-3">Precio Total</th>
                    <th scope="col" className="px-6 py-3">Estado</th>
                    <th scope="col" className="px-6 py-3">Cliente</th>
                    <th scope="col" className="px-6 py-3">Menú</th>
                    <th scope="col" className="px-6 py-3">Moto</th>
                    <th scope="col" className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="odd:bg-whiteodd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    > <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.quantity}</td>
                      <td className="px-6 py-4">{order.total_price}</td>
                      <td className="px-6 py-4">{order.status}</td>
                      <td className="px-6 py-4">{order.customer_id}</td>
                      <td className="px-6 py-4">{order.menu_id}</td>
                      <td className="px-6 py-4">{order.motorcycle_id}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => order.id !== undefined && handleView(order.id)}
                          className="text-blue-600 dark:text-blue-500"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => order.id !== undefined && handleEdit(order.id)}
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => order.id !== undefined && handleDelete(order.id)}
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
      </div>
    </div>
  );
};

export default ListOrder;