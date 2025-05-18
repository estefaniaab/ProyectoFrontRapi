import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Photo } from "../../models/Photo";
import PhotoContainerWithHeader from "../../components/Photo/PhotoContainerWhitHeader";
import Breadcrumb from "../../components/Breadcrumb";
import PhotoFormValidator from "../../components/Photo/PhotoFromValidator";

const CreatePhoto: React.FC = () => {
    const navigate = useNavigate();
    const { issue_id } = useParams<{ issue_id?: string }>();
       
    const issueId = issue_id && /^\d+$/.test(issue_id) ? parseInt(issue_id, 10) : undefined;
    


    const handleCreatePhoto = async (photo: Photo) => {
        try {
            if (photo && issue_id) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente la foto",
                    icon: "success",
                    timer: 3000,
                });
                console.log(photo);
                
                navigate(`/photo/list/${issue_id}`);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo asignar correctamente el ID de la avería.",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            console.error("Error al crear la foto:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear la foto",
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <PhotoContainerWithHeader issueId={issueId}>
            <Breadcrumb pageName="Crear Foto" />
            <PhotoFormValidator
                handleCreate={handleCreatePhoto}
                mode={1}
                readOnly={false}
                issueId={issueId}
            />
        </PhotoContainerWithHeader>
    );
};

export default CreatePhoto;
