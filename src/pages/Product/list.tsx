import { Eye, Edit, Trash2 } from "lucide-react"; // Libreria iconos
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { Product } from "../../models/Product";
import { productService } from "../../services/productService";

const ListProduct = () => {
    const navigate = useNavigate();

    // Estado para almacenar los datos del JSON
    const [data, setData] = useState<Product[]>([]);

    //Llamar 'fetcData' cuando el componente se monta
    useEffect(() => { // Metodo cuando se carga la pagina
        fetchData();  // Saca la info
    }, [])

    const fetchData = async () => {
        const products = await productService.getProducts();
        setData(products); // Actualiza la variable reactiva
    };

    //funciones para manajar acciones
    const handleCreate = () => {
        console.log("Vamos a crear un producto");
        navigate("/product/create"); // Redireccionamos a la parte de create customers
    }
    const handleView = (id: number) => {
        console.log(`Registro con ID: ${id}`);
        navigate("/product/view/" + id);
    };
    const handleEdit = (id: number) => {
        console.log(`Editar registro ${id}`);
        navigate("/product/update/" + id)
    }
    const handleDelete = async (id: number) => {
        console.log(`Eliminando producto ${id}`);
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
                const success = await productService.deleteProduct(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "Se ha eliminado correctamente el registro",
                        icon: "success",
                        timer: 3000
                    })
                    fetchData(); // Actualiza la tabla
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Existe un problema al momento de eliminar el registro",
                        icon: "error",
                        timer: 3000
                    })
                }
            }
        })
    };
   return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                {/* Input fields */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado de Productos
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
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Descripción</th>
                                        <th scope="col" className="px-6 py-3">precio</th>
                                        <th scope="col" className="px-6 py-3">Categria</th>                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => ( // El .map es un mapeo que parece un ciclo for, que recorre elemento por elemento de la lista
                                        <tr key={item.id} className="odd:bg-whiteodd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                            <td className="px-6 py-4">{item.description}</td>
                                            <td className="px-6 py-4">{item.price}</td>
                                            <td className="px-6 py-4">{item.category}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    onClick={() => handleView(item.id ? item.id : 0)}
                                                    className="text-blue-600 dark:text-blue-500"
                                                >
                                                    <Eye size={20} /> {/* Ícono de ver */}
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(item.id ? item.id : 0)}
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
}
export default ListProduct;