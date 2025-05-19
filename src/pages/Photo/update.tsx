import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { Photo } from "../../models/Photo";
import { photoService } from "../../services/photoService";

import PhotoContainerWithHeader from "../../components/Photo/PhotoContainerWhitHeader";
import PhotoFormValidator from "../../components/Photo/PhotoFromValidator";

const UpdatePhoto: React.FC = () => {
  const navigate = useNavigate();
  const { id, issue_id } = useParams<{ id?: string; issue_id?: string }>();
  const photoId = id ? parseInt(id) : undefined;
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Al cargar, se recupera la foto a actualizar
  useEffect(() => {
    const fetchPhoto = async () => {
      if (!photoId) {
        Swal.fire({
          title: "Error",
          text: "ID de foto inválido",
          icon: "error",
          timer: 3000,
        });
        navigate("/photo/list");
        return;
      }

      try {
        const fetchedPhoto = await photoService.getPhotoById(photoId);
        if (!fetchedPhoto) {
          Swal.fire({
            title: "Error",
            text: "No se encontró la foto",
            icon: "error",
            timer: 3000,
          });
          navigate("/photo/list");
        } else {
          setPhoto(fetchedPhoto);
        }
      } catch (error) {
        console.error("Error al obtener la foto:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo obtener la foto",
          icon: "error",
          timer: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photoId, navigate]);

  // Función que se ejecuta al enviar el formulario actualizado
  const handleUpdatePhoto = async (updatedPhoto: Photo) => {
    try {
      let result = null;

      /*
       * Si se ha seleccionado una nueva imagen, es posible que
       * updatedPhoto.image_url sea de tipo File en lugar de string.
       * En ese caso, podemos optar por enviar la actualización a través
       * de FormData. Si no se seleccionó nueva imagen, se envía tal cual.
       */
      if (updatedPhoto.image_url && typeof updatedPhoto.image_url !== "string") {
        // Se construye el FormData para actualizar el archivo
        const formData = new FormData();
        formData.append("issue_id", updatedPhoto.issue_id!.toString());
        formData.append("file", updatedPhoto.image_url as File);
        if (updatedPhoto.caption) {
          formData.append("caption", updatedPhoto.caption);
        }
        if (updatedPhoto.taken_at) {
          formData.append("taken_at", updatedPhoto.taken_at.toISOString());
        }
        // Se asume que el servicio de actualización acepta FormData o un objeto similar
        result = await photoService.updatePhoto(photoId!, formData);
      } else {
        // Si no se selecciona nueva imagen, actualizamos con la información existente
        const dataToUpdate: Partial<Photo> =  {
          caption: updatedPhoto.caption,
          taken_at: updatedPhoto.taken_at ? updatedPhoto.taken_at : undefined,
          issue_id: updatedPhoto.issue_id
          // No incluimos image_url si no se modificó
        };
        result = await photoService.updatePhoto(photoId!, dataToUpdate);
      }

      if (result) {
        Swal.fire({
          title: "Completado",
          text: "La foto ha sido actualizada correctamente.",
          icon: "success",
          timer: 3000,
        });
        navigate(updatedPhoto.issue_id ? `/photo/list/${updatedPhoto.issue_id}` : "/photo/list");
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar la foto.",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error al actualizar la foto:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la foto.",
        icon: "error",
        timer: 3000,
      });
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!photo) {
    return <div>Foto no encontrada</div>;
  }

  return (
    <PhotoContainerWithHeader issueId={photo.issue_id}>
      <Breadcrumb pageName="Actualizar Foto" />
      <PhotoFormValidator
        mode={2} // Modo actualizar
        readOnly={false}
        photo={photo}
        issueId={photo.issue_id}
        handleUpdate={handleUpdatePhoto}
      />
    </PhotoContainerWithHeader>
  );
};

export default UpdatePhoto;
