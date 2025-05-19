import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Driver } from "../../models/Driver";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { driverService } from "../../services/driverService";


const ListDriver = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Driver[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const drivers = await driverService.getDrivers();
        setData(drivers);
    };

    const handleCreate = () => navigate("/driver/create");
    const handleView = (id: number) => navigate("/driver/view/" + id);
    const handleEdit = (id: number) => navigate("/driver/update/" + id);
    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "Está seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await driverService.deleteDriver(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "Se ha eliminado correctamente el registro",
                        icon: "success",
                        timer: 3000
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Existe un problema al momento de eliminar el registro",
                        icon: "error",
                        timer: 3000
                    });
                }
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default">
                    <div className="border-b border-stroke px-6.5 py-4">
                        <h3 className="font-medium text-black">Listado de conductores</h3>
                        <button onClick={handleCreate} className="text-green-600">Crear</button>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">nombre</th>
                                        <th scope="col" className="px-6 py-3">Número de licencia</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Telefono</th>
                                        <th scope="col" className="px-6 py-3">Estado</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                            <td className="px-6 py-4">{item.name}</td>
                                            <td className="px-6 py-4">{item.license_number}</td>
                                            <td className="px-6 py-4">{item.email}</td>
                                            <td className="px-6 py-4">{item.phone}</td>
                                            <td className="px-6 py-4">{item.status}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(item.id || 0)} className="text-blue-600"><Eye size={20} /></button>
                                                <button onClick={() => handleEdit(item.id || 0)} className="text-yellow-600"><Edit size={20} /></button>
                                                <button onClick={() => item.id && handleDelete(item.id)} className="text-red-600"><Trash2 size={20} /></button>
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

export default ListDriver;