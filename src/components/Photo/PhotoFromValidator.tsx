import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Photo } from "../../models/Photo";
import { useNavigate } from "react-router-dom";

interface PhotoFormProps {
    mode: number; // 1: Crear, 2: Actualizar
    handleCreate?: (values: any) => void;
    handleUpdate?: (values: any) => void;
    readOnly?: boolean;
    photo?: Photo | null;
}

const PhotoFormValidator: React.FC<PhotoFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, photo }) => {
    const navigate = useNavigate();

    // Reintroducimos handleSubmit
    const handleSubmit = (values: any) => {
        if (mode === 1 && handleCreate) {
            handleCreate(values);
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(values);
        } else {
            console.error("No function provided for the current mode");
        }
    };

    return (
        <Formik
            initialValues={{
                file: null,
                caption: photo?.caption || "",
                taken_at: photo?.taken_at ? new Date(photo.taken_at) : new Date(),
                image_url: photo?.image_url || "",
            }}
            validationSchema={(values: any) =>
                Yup.object({
                    file: Yup.mixed().test(
                        "file-required",
                        "La imagen es obligatoria",
                        (value) => {
                            if (mode === 1) {
                                return !!value; // En modo crear, file debe existir
                            }
                            return true; // En modo actualizar, file es opcional
                        }
                    ),
                    caption: Yup.string().required("El título es obligatorio"),
                    taken_at: Yup.date().required("La fecha y hora son obligatorias"),
                })
            }
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ handleSubmit: formikHandleSubmit, setFieldValue, values }) => (
                <Form onSubmit={formikHandleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {mode === 2 && values.image_url && (
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Imagen Actual</label>
                            <img src={values.image_url} alt="Imagen actual" className="w-32 h-32 object-cover rounded" />
                        </div>
                    )}
                    <div>
                        <label htmlFor="file" className="block text-lg font-medium text-gray-700">
                            {mode === 1 ? "Seleccionar Imagen" : "Cambiar Imagen (opcional)"}
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
                        <label htmlFor="taken_at" className="block text-lg font-medium text-gray-700">Fecha y Hora</label>
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
                            className={`py-2 px-4 text-black rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                        >
                            {mode === 1 ? "Crear" : "Actualizar"}
                        </button>
                    )}
                    <button
                        type="button"
                        className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                        onClick={() => navigate("/list/photo")}
                    >
                        Volver
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default PhotoFormValidator;