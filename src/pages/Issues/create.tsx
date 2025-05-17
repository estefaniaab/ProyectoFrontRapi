import { Eye, Edit, Trash2 } from "lucide-react"; // Libreria iconos
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { photoService } from "../../services/photoService";
import { Photo } from "../../models/Photo";
import Swal from "sweetalert2";

const IssuesCrear = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const navigate = useNavigate();

    // Obtener la lista de fotos al cargar el componente
    useEffect(() => {
       

        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        const data = await photoService.getPhotos();
        console.log("Datos obtenidos:", data); // Para depurar
        setPhotos(data);
    };

    const handleCreate =()=>{
        console.log("Creación de producto");
        navigate("/photo/create")
    }
    const handleView = (id: number) => {
        console.log(`Registro con ID: ${id}`);
        navigate("/view/photo/" + id);
    };
    const handleEdit = (id: number) => {
        console.log(`Editar registro ${id}`);
        navigate("/update/photo/" + id)
    }

    const handleDelete = async (id:number) =>{
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
                        const success = await photoService.deletePhoto(id);
                        if (success) {
                            Swal.fire({
                                title: "Eliminado",
                                text: "Se ha eliminado correctamente el registro",
                                icon: "success",
                                timer: 3000
                            })
                            fetchPhotos(); // Actualiza la tabla
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

    }
    // Función para construir la URL pública de la imagen
    const getPublicImageUrl = (imagePath: string) => {
        const filename = imagePath.split("\\").pop(); // Extrae el nombre del archivo
        return `${import.meta.env.VITE_API_URL}/uploads/${filename}`; // Construye la URL pública
    };
   
    return (
        <div className="grid grid-cols-1 gap-9">
            <h1>Aqui va la tabla de issues</h1>
            <button>
                Crear Issues
            </button>
        </div>

    );
};

export default IssuesCrear;