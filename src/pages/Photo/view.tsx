import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Photo } from "../../models/Photo";
import { photoService } from "../../services/photoService";
import Breadcrumb from "../../components/Breadcrumb";
import PhotoContainerWithHeader from "../../components/Photo/PhotoContainerWhitHeader";
import PhotoFormValidator from "../../components/Photo/PhotoFromValidator";

const ViewPhoto: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!id) return;
            const photoId = parseInt(id);
            if (isNaN(photoId) || photoId <= 0) return;
            const photoData = await photoService.getPhotoById(photoId);
            setPhoto(photoData);
        };
        fetchPhoto();
    }, [id]);

    if (!photo) {
        return <div className="p-4 text-gray-600">Cargando...</div>;
    }

    return (
        <PhotoContainerWithHeader issueId={photo?.issue_id}>
            <Breadcrumb pageName="Ver Foto" />
            <PhotoFormValidator mode={3} photo={photo} readOnly={true} />
        </PhotoContainerWithHeader>
    );
};

export default ViewPhoto;