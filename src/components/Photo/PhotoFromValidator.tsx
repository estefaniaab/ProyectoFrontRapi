import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Photo } from "../../models/Photo";
import { photoService } from "../../services/photoService";


interface PhotoFormProps {
    mode: number;
    handleCreate?: (values: Photo) => void;
    handleUpdate?: (values: Photo) => void;
    readOnly?: boolean;
    photo?: Photo | null;
    issueId?: number;
}

const PhotoFormValidator: React.FC<PhotoFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, photo, issueId }) => {
    const navigate = useNavigate();

    const handleSubmit = (values: Photo) => {
        if (mode === 1 && handleCreate) {
            handleCreate(values);
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(values);
        } else {
            console.error("No function provided for the current mode");
        }
    };

    const effectiveIssueId = issueId || photo?.issue_id;

    return (
        <Formik
            initialValues={{
                issue_id: photo?.issue_id || issueId || 0,
                file: null,
                caption: photo?.caption || "",
                taken_at: photo?.taken_at ? new Date(photo.taken_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
                image_url: photo?.image_url || "",
            }}
            validationSchema={Yup.object({
                issue_id: Yup.number()
                    .required("El ID de la avería es obligatorio")
                    .positive("Debe ser un número positivo")
                    .integer("Debe ser un número entero"),
                file: Yup.mixed().test("file-required", "La imagen es obligatoria", (value) => {
                    if (mode === 1) {
                        return !!value;
                    }
                    return true;
                }),
                caption: Yup.string().required("El título es obligatorio"),
                taken_at: Yup.date().required("La fecha y hora son obligatorias"),
            })}
            onSubmit={async (values) => {
                if (mode === 1) {
                    const formData = new FormData();
                    formData.append("issue_id", values.issue_id.toString());
                    formData.append("caption", values.caption);
                    formData.append("taken_at", values.taken_at.toString());
                    if (values.file) {
                        formData.append("file", values.file);
                    }
                    const createdPhoto = await photoService.uploadPhoto(formData);
                    if (createdPhoto) {
                        handleSubmit(createdPhoto);
                    }
                } else {
                    const updatedValues: Photo = {
                        id: photo?.id,
                        issue_id: values.issue_id,
                        image_url: values.image_url,
                        caption: values.caption,
                        taken_at: new Date(values.taken_at),
                    };
                    if (values.file) {
                        const formData = new FormData();
                        formData.append("issue_id", values.issue_id.toString());
                        formData.append("caption", values.caption);
                        formData.append("taken_at", values.taken_at.toString());
                        formData.append("file", values.file);
                        const uploadedPhoto = await photoService.uploadPhoto(formData);
                        if (uploadedPhoto) {
                            updatedValues.image_url = uploadedPhoto.image_url;
                        }
                    }
                    handleSubmit(updatedValues);
                }
            }}
        >
            {({ handleSubmit: formikHandleSubmit, setFieldValue, values }) => (
                <Form onSubmit={formikHandleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {mode !== 1 && values.image_url && (
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Imagen Actual</label>
                            <img src={values.image_url} alt="Imagen actual" className="w-32 h-32 object-cover rounded" />
                        </div>
                    )}
                    <div>
                        <label htmlFor="file" className="block text-lg font-medium text-gray-700">
                            {mode === 1 ? "Seleccionar Imagen" : "Cambiar Imagen (Opcional)"}
                        </label>
                        <input
                            type="file"
                            name="file"
                            onChange={(event) => {
                                const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                setFieldValue("file", file);
                            }}
                            className="w-full border rounded-md p-2"
                            disabled={readOnly}
                        />
                        <ErrorMessage name="file" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="caption" className="block text-lg font-medium text-gray-700">Título</label>
                        <Field
                            type="text"
                            name="caption"
                            className="w-full border rounded-md p-2"
                            disabled={readOnly}
                        />
                        <ErrorMessage name="caption" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="taken_at" className="block text-lg font-medium text-gray-700">
                            Fecha y Hora
                        </label>
                        <Field
                            type="datetime-local"
                            name="taken_at"
                            className="w-full border rounded-md p-2"
                            disabled={readOnly}
                        />
                        <ErrorMessage name="taken_at" component="p" className="text-red-500 text-sm" />
                    </div>
                    {!readOnly && (
                        <button
                            type="submit"
                            className={`py-2 px-4 text-black rounded-md ${
                                mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {mode === 1 ? "Crear" : "Actualizar"}
                        </button>
                    )}
                    <button
                        type="button"
                        className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                        onClick={() => navigate(`/photo/list/${effectiveIssueId}`)}
                    >
                        Volver
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default PhotoFormValidator;