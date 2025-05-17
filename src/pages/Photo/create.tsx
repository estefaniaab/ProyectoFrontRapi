import { useNavigate } from "react-router-dom";
import { photoService } from "../../services/photoService";
import Swal from "sweetalert2";
import PhotoFormValidator from "../../components/Photo/PhotoFromValidator";
import Breadcrumb from "../../components/Breadcrumb";

const CreatePhoto = () => {
    // Inicializamos el navegador
    const navigate = useNavigate();

    // Lógica de creación
    const handleCreatePhoto = async (photo: any) => {
        try {
            const createdPhoto = await photoService.createPhoto(photo);
            if (createdPhoto) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente la foto",
                    icon: "success",
                    timer: 3000,
                });

                console.log("Foto creada con éxito:", createdPhoto);
                navigate("/photo/list"); // Volvemos a la página de listado
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear la foto",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            console.error("Error al crear la foto:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error inesperado al crear la foto",
                icon: "error",
                timer: 3000,
            });
        }
    };

      return (
        <div>
            {/* Formulario para crear una nueva foto */}
            <h2>Create Photo</h2>
            <Breadcrumb pageName="Crear Foto" />
            <PhotoFormValidator
                handleCreate={handleCreatePhoto}
                mode={1} // Modo de creación
                readOnly={false}
            />
        </div>
    );
};

export default CreatePhoto;