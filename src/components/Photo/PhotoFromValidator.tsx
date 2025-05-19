import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Photo } from "../../models/Photo";

// Helper que convierte una ruta de imagen en URL absoluta usando la URL base.
const getPublicImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${import.meta.env.VITE_API_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

// Helper que formatea una fecha al formato requerido por el input datetime-local (yyyy-MM-ddThh:mm)
const formatDatetimeLocal = (date: Date): string => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

interface MyFormProps {
  mode: number; // 1 (crear), 2 (actualizar), 3 (visualizar)
  handleCreate?: (values: Photo) => void;
  handleUpdate?: (values: Photo) => void;
  readOnly?: boolean;
  photo?: Photo | null;
  issueId?: number;
}

const PhotoFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, photo, issueId }) => {
  const navigate = useNavigate();
  const effectiveIssueId = issueId || photo?.issue_id;
  const [imagePreview, setImagePreview] = useState<string | null>(
    photo?.image_url ? getPublicImageUrl(photo.image_url) : null
  );

  // Función que se activa al seleccionar una imagen en el input file.
  // Actualiza la vista previa y guarda el objeto File en el campo "image_url" de Formik.
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFieldValue("image_url", file);
    }
  };

  const handleSubmit = (formattedValues: Photo) => {
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error("No function provided for the current mode");
    }
  };

  return (
    <Formik
      initialValues={
        photo
          ? {
              issue_id: photo.issue_id,
              image_url: photo.image_url,
              caption: photo.caption,
              taken_at: photo.taken_at ? formatDatetimeLocal(new Date(photo.taken_at)) : "",
            }
          : {
              issue_id: effectiveIssueId ?? "",
              image_url: "",
              caption: "",
              taken_at: "",
            }
      }
      validationSchema={Yup.object({
        // Usamos Yup.mixed() para admitir que image_url pueda ser un File (en creación/modificación)
        image_url: Yup.mixed().required("La imagen es obligatoria"),
        caption: Yup.string().required("El título es obligatorio"),
        taken_at: Yup.date().required("La fecha y hora son obligatorias"),
      })}
      onSubmit={(values) => {
        const formattedValues: Photo = {
          id: photo?.id,
          issue_id: photo?.issue_id || effectiveIssueId,
          image_url: values.image_url,
          caption: values.caption,
          taken_at: new Date(values.taken_at),
        };
        handleSubmit(formattedValues);
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          {/* ID de Avería */}
          <div>
            <label htmlFor="issue_id" className="block text-lg font-medium text-gray-700">
              ID de la Avería
            </label>
            <Field type="number" name="issue_id" className="w-full border rounded-md p-2" disabled={readOnly} />
            <ErrorMessage name="issue_id" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Imagen */}
          <div>
            <label htmlFor="image_url" className="block text-lg font-medium text-gray-700">
              Seleccionar Imagen
            </label>
            <div className="flex flex-col items-center">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              {!readOnly && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 inline-block"
                  >
                    Seleccionar Foto
                  </label>
                </>
              )}
            </div>
            <ErrorMessage name="image_url" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Título */}
          <div>
            <label htmlFor="caption" className="block text-lg font-medium text-gray-700">
              Título
            </label>
            <Field type="text" name="caption" className="w-full border rounded-md p-2" disabled={readOnly} />
            <ErrorMessage name="caption" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Fecha y Hora */}
          <div>
            <label htmlFor="taken_at" className="block text-lg font-medium text-gray-700">
              Fecha y Hora
            </label>
            <Field type="datetime-local" name="taken_at" className="w-full border rounded-md p-2" disabled={readOnly} />
            <ErrorMessage name="taken_at" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Botón de enviar */}
          {!readOnly && (
            <button
              type="submit"
              className={`py-2 px-4 text-black rounded-md ${
                mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {mode === 1 ? "Crear" : mode === 2 ? "Actualizar" : ""}
            </button>
          )}

          {/* Botón de volver */}
          <button
            type="button"
            className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
            onClick={() => {
              navigate(effectiveIssueId ? `/photo/list/${effectiveIssueId}` : "/photo/list");
            }}
          >
            Volver
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PhotoFormValidator;
