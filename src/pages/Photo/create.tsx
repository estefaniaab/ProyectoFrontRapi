import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { Photo } from "../../models/Photo";
import { photoService } from "../../services/photoService";

import PhotoContainerWithHeader from "../../components/Photo/PhotoContainerWhitHeader";
import PhotoFormValidator from "../../components/Photo/PhotoFromValidator";

const CreatePhoto: React.FC = () => {
  const navigate = useNavigate();
  const { issue_id } = useParams<{ issue_id?: string }>();
  // Convertimos issue_id a número, si existe
  const issueId = issue_id ? parseInt(issue_id) : undefined;

  // Función para crear la foto
  const handleCreatePhoto = async (photo: Omit<Photo, "id">) => {
    try {
      const formData = new FormData();
   // Usamos el issue_id del formulario, o en su defecto el issueId de la URL
    const issueIdToSend =
      typeof photo.issue_id === "number" ? photo.issue_id : issueId;
    
    if (!issueIdToSend) {
      throw new Error("issue_id es requerido");
    }
    
    formData.append("issue_id", issueIdToSend.toString());

    // Verificamos y agregamos el archivo (image_url) usando type assertion
    if (photo.image_url && typeof photo.image_url !== "string") {
        formData.append("file", photo.image_url as File);
    }
    if (photo.caption) {
      formData.append("caption", photo.caption);
    }
    if (photo.taken_at) {
      formData.append("taken_at", photo.taken_at.toISOString());
    }

    const createdPhoto = await photoService.uploadPhoto(formData);
      if (createdPhoto) {
        Swal.fire({
          title: "Completado",
          text: "Se ha subido correctamente la foto.",
          icon: "success",
          timer: 3000,
        });
        // Redirige al listado de fotos
        navigate(issueId ? `/photo/list/${issueId}` : "/photo/list");
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al subir la foto.",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error al subir la foto:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al subir la foto.",
        icon: "error",
        timer: 3000,
      });
    }
  };

  return (
    <PhotoContainerWithHeader issueId={issueId}>
      <Breadcrumb pageName="Subir Foto" />
      {/* Se pasa la función handleCreate y se establece el modo "crear" */}
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
