import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Photo } from "../../models/Photo";
import { photoService } from "../../services/photoService";
import Breadcrumb from "../../components/Breadcrumb";
import PhotoContainerWithHeader from "../../components/Photo/PhotoContainerWhitHeader";
import PhotoFormValidator from "../../components/Photo/PhotoFromValidator";

const UpdatePhoto: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!id) return;
            const photoId = parseInt(id);
            if (isNaN(photoId) || photoId <= 0) return;
            const photoData = await photoService.getPhotoById(photoId);
            if (photoData) {
                setPhoto(photoData);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Foto no encontrada",
                    icon: "error",
                    timer: 3000,
                });
                navigate(`/photo/list/`);
            }
        };
        fetchPhoto();
    }, [id, navigate]);

    const handleUpdatePhoto = async (thePhoto: Photo) => {
        try {
            if (!thePhoto.id || thePhoto.id <= 0) {
                Swal.fire({
                    title: "Error",
                    text: "ID de foto inválido",
                    icon: "error",
                    timer: 3000,
                });
                return;
            }
            const updatedPhoto = await photoService.updatePhoto(thePhoto.id, thePhoto);
            if (updatedPhoto) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente la foto",
                    icon: "success",
                    timer: 3000,
                });
                navigate(`/photo/list/${thePhoto.issue_id}`);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al actualizar la foto",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar la foto",
                icon: "error",
                timer: 3000,
            });
        }
    };

    if (!photo) {
        return <div>Cargando...</div>;
    }

    return (
        <PhotoContainerWithHeader issueId={photo?.issue_id}>
            <Breadcrumb pageName="Actualizar Foto" />
            <PhotoFormValidator
                handleUpdate={handleUpdatePhoto}
                mode={2}
                readOnly={false}
                photo={photo}
            />
        </PhotoContainerWithHeader>
    );
};

export default UpdatePhoto;