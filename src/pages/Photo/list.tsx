import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Photo } from "../../models/Photo";
import { photoService } from "../../services/photoService";
import PhotoContainerWithHeader from "../../components/Photo/PhotoContainerWhitHeader";

const ListPhoto: React.FC = () => {
    const navigate = useNavigate();
    const { issue_id } = useParams<{ issue_id?: string }>();
    const issueId = issue_id ? parseInt(issue_id) : undefined;
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        fetchPhotos();
    }, [issueId]);

    const fetchPhotos = async () => {
        let photos: Photo[] = [];

        if (issueId ) {
            if(!isNaN(issueId)){
                photos = await photoService.getPhotosByIssueId(issueId);
            }else{
                console.error("ID de la averia inválido:", issue_id);
            }           
            
        } else {
            photos = await photoService.getPhotos(); // 
        }

        console.log("Fotos obtenidas:", photos); // 
        setPhotos(photos);
    };
    const getPublicImageUrl = (imagePath: string | undefined) => {
        if (!imagePath) return `${import.meta.env.VITE_API_URL}/uploads/default.png`;
        const filename = imagePath.split("\\").pop() || "default.png";
        return `${import.meta.env.VITE_API_URL}/uploads/${filename}`;
    }

    const handleCreate = () => {
        if (issueId) {
            navigate(`/photo/create/${issueId}`);
        } else {
            Swal.fire({
                title: "Error",
                text: "Para crear una foto se debe hacer desde averías.",
                icon: "error",
                timer: 3000,
            });
        }
    };

    const handleView = (id: number) => {
        if (id) navigate(`/photo/view/${id}`);
    };

    const handleEdit = (id: number) => {
        if (id) navigate(`/photo/update/${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar la foto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await photoService.deletePhoto(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "Se ha eliminado correctamente la foto",
                        icon: "success",
                        timer: 3000,
                    });
                    fetchPhotos();
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al eliminar la foto",
                        icon: "error",
                        timer: 3000,
                    });
                }
            }
        });
    };

    /*const getPublicImageUrl = (imagePath: string | undefined) => {
        if (!imagePath) return `${import.meta.env.VITE_API_URL}/uploads/default.png`;
        const filename = imagePath.split("\\").pop() || "default.png";
        return `${import.meta.env.VITE_API_URL}/uploads/${filename}`;
    };*/

    return (
        <PhotoContainerWithHeader issueId={issueId}>
            <div className="grid grid-cols-1 gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Listado de Fotos</h3>
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
                                            <th className="border border-gray-300 p-2">Imagen</th>
                                            <th className="border border-gray-300 p-2">Descripción</th>
                                            <th className="border border-gray-300 p-2">Fecha</th>
                                            <th className="border border-gray-300 p-2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {photos.map((photo) => (
                                            <tr
                                                key={photo.id}
                                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {photo.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <img
                                                        src={getPublicImageUrl(photo.image_url)}
                                                        alt={photo.caption || "Foto"}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">{photo.caption || "Sin descripción"}</td>
                                                <td className="px-6 py-4">
                                                   {photo.taken_at ? new Date(photo.taken_at).toLocaleString() : "Fecha inválida"}
                                                </td>
                                                <td className="px-6 py-4 space-x-2">
                                                    <button
                                                        onClick={() => handleView(photo.id || 0)}
                                                        className="text-blue-600 dark:text-blue-500"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(photo.id || 0)}
                                                        className="text-yellow-600 dark:text-yellow-500"
                                                    >
                                                        <Edit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => photo.id !== undefined && handleDelete(item.id)}
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
        </PhotoContainerWithHeader>
    );
};

export default ListPhoto;
