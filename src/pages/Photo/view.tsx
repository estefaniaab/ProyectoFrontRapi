import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Photo } from "../../models/Photo";
import { photoService } from "../../services/photoService";
import Breadcrumb from "../../components/Breadcrumb";
import PhotoContainerWithHeader from "../../components/Photo/PhotoContainerWhitHeader";
import PhotoFormValidator from "../../components/Photo/PhotoFromValidator";

const ViewPhoto: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log("Param id:", id);
    
    const [photo, setPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!id) {
                console.error("No se recibió el id en los parámetros.");
                return;
            }
            const photoId = parseInt(id, 10);
            console.log("Parsed photoId:", photoId);
            if (isNaN(photoId) || photoId <= 0) {
                console.error("El id de la foto es inválido:", id);
                return;
            }
            const photoData = await photoService.getPhotoById(photoId);
            console.log("Photo data recibida:", photoData);
            setPhoto(photoData);
        };
        fetchPhoto();
    }, [id]);

    if (!photo) {
        return <div className="p-4 text-gray-600">Cargando...</div>;
    }

    return (
        <PhotoContainerWithHeader issueId={photo.issue_id}>
            <Breadcrumb pageName="Ver Foto" />
            <PhotoFormValidator mode={3} photo={photo} readOnly={true} />
        </PhotoContainerWithHeader>
    );
};

export default ViewPhoto;
