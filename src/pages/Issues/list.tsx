import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, Edit, Trash2, Camera } from "lucide-react";
import Swal from "sweetalert2";

import { issueService } from "../../services/issueService";
import { Issue } from "../../models/Issues";
import IssueContainerWithHeader from "../../components/Issue/IssueContainerWhitHeader";


const ListIssue: React.FC = () => {
    const navigate = useNavigate();
    const { motorcycle_id } = useParams<{ motorcycle_id: string }>();
    const motorcycleId = parseInt(motorcycle_id || "0");
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        fetchIssues();
    }, [motorcycleId]);

    const fetchIssues = async () => {
        const data = await issueService.getIssues();
        const filteredIssues = data.filter((issue) => issue.motorcycle_id === motorcycleId);
        setIssues(filteredIssues);
    };

    const handleCreate = () => {
        navigate(`/issues/create/${motorcycleId}`);
    };

    const handleView = (id: number) => {
        navigate(`/issues/view/${id}`);
    };

    const handleEdit = (id: number) => {
        navigate(`/issues/update/${id}`);
    };

    const handlePhotos = (id: number) => {
        navigate(`/photo/list/${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar la avería?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await issueService.deleteIssue(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "Se ha eliminado correctamente la avería",
                        icon: "success",
                        timer: 3000,
                    });
                    fetchIssues();
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al eliminar la avería",
                        icon: "error",
                        timer: 3000,
                    });
                }
            }
        });
    };

    return (
        <IssueContainerWithHeader motorcycleId={motorcycleId}>
            <div className="grid grid-cols-1 gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Listado de Averías</h3>
                            <button onClick={handleCreate} className="text-green-600 dark:text-green-500">
                                Crear
                            </button>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th className="border border-gray-300 p-2">ID</th>
                                            <th className="border border-gray-300 p-2">Descripción</th>
                                            <th className="border border-gray-300 p-2">Fecha de Reporte</th>
                                            <th className="border border-gray-300 p-2">Fecha de Resolución</th>
                                            <th className="border border-gray-300 p-2">Estado</th>
                                            <th className="border border-gray-300 p-2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {issues.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {item.id}
                                                </td>
                                                <td className="px-6 py-4">{item.description}</td>
                                                <td className="px-6 py-4">{new Date(item.reported_at).toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    {item.resolved_at ? new Date(item.reported_at).toLocaleString() : "N/A"}
                                                </td>
                                                <td className="px-6 py-4">{item.status}</td>
                                                <td className="px-6 py-4 space-x-2">
                                                    <button
                                                        onClick={() => handleView(item.id || 0)}
                                                        className="text-blue-600 dark:text-blue-500"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(item.id || 0)}
                                                        className="text-yellow-600 dark:text-yellow-500"
                                                    >
                                                        <Edit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handlePhotos(item.id || 0)}
                                                        className="text-purple-600 dark:text-purple-500"
                                                    >
                                                        <Camera size={20} />
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
                </div>
            </div>
        </IssueContainerWithHeader>
    );
};

export default ListIssue;