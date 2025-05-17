import { Eye, Edit, Trash2 } from "lucide-react"; // Libreria iconos
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { Customer } from "../../models/Customer";
import { customerService } from "../../services/customerService";
// import GenericTable from "../../components/GenericTable";  => Me falta ver como usarlo

const ListCustomers = () => {
    const navigate = useNavigate();

    // Estado para almacenar los datos del JSON
    const [data, setData] = useState<Customer[]>([]);

    // Llamar 'fetcData' cuando el componente se monta
    useEffect(() => { // Metodo cuando se carga la pagina
        fetchData();  // Saca la info
    }, [])

    // Obtener datos usuario
    const fetchData = async () => {
        const customers = await customerService.getCustomers();
        setData(customers); // Actualiza la variable reactiva
    };

    // Fucnioes para manajar acciones
    const handleCreate = () => {
        console.log("Vamos a crear un usuario");
        navigate("/customers/create"); // Redireccionamos a la parte de create customers
        
    }
    const handleView = (id: number) => {
        console.log(`Registro con ID: ${id}`);
        navigate("/customers/view/" + id);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar registro ${id}`);
        navigate("/customers/update/" + id)
        
    }

    const handleDelete = async (id: number) => {
        console.log(`Eliminando usuario ${id}`);
        Swal.fire({
            title: "Eliminación",
            text: "Esta seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await customerService.deleteCustomer(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "El registo se ha eliminado",
                        icon: "success"
                    });
                }
                // Obtener los usuarios despues de eliminar uno
                fetchData();
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                {/* Input fields */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado Customers
                        </h3>
                        <button 
                        onClick={() => handleCreate()}
                        className="text-green-600 dark:text-green-500"
                        >Crear</button>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">P</th>
                                        <th scope="col" className="px-6 py-3">Correo</th>
                                        <th scope="col" className="px-6 py-3">Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => ( // El .map es un mapeo que parece un ciclo for, que recorre elemento por elemento de la lista
                                        <tr key={item.id} className="odd:bg-whiteodd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                            <td className="px-6 py-4">{item.email}</td>
                                            <td className="px-6 py-4">{item.phone}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    onClick={() => handleView(item.id ? item.id : 0)}
                                                    className="text-blue-600 dark:text-blue-500"
                                                >
                                                    <Eye size={20} /> {/* Ícono de ver */}
                                                </button>
                                                <button
                                                    onClick={() => item.id !== undefined && handleEdit(item.id)}
                                                    className="text-yellow-600 dark:text-yellow-500"
                                                >
                                                    <Edit size={20} /> {/* Ícono de editar */}
                                                </button>
                                                <button
                                                    onClick={() => item.id !== undefined && handleDelete(item.id)}
                                                    className="text-red-600 dark:text-red-500"
                                                >
                                                    <Trash2 size={20} /> {/* Ícono de eliminar */}
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

export default ListCustomers;