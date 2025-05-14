import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Photo } from "../../models/Photo";
import { useNavigate } from "react-router-dom";

interface PhotoFormProps {
    mode: number; // 1: Crear, 2: Actualizar
    handleCreate?: (values: Photo) => void;
    handleUpdate?: (values: Photo) => void;
    readOnly?: boolean;
    photo?: Photo | null;
}

const PhotoFormValidator: React.FC<PhotoFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, photo }) => {
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

     return (
        <Formik
            initialValues={photo || {
                image_url: "",
                caption: "",
                taken_at: new Date() // Inicializa como una cadena ISO
                
            }}
            validationSchema={Yup.object({
                image_url: Yup.string().url("Debe ser una URL válida").required("La URL de la imagen es obligatoria"),
                caption: Yup.string().required("El título es obligatorio"),
                taken_at: Yup.date().required("La fecha y hora son obligatorias"),
                
            })}
             onSubmit={(values) => {
                const formattedValues = { ...values};
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    <div>
                        <label htmlFor="image_url" className="block text-lg font-medium text-gray-700">URL de la Imagen</label>
                        <Field
                            type="text"
                            name="image_url"
                            className="w-full border rounded-md p-2"
                            disabled={readOnly}
                        />
                        <ErrorMessage name="image_url" component="p" className="text-red-500 text-sm" />
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
                            type="datetime-local" // Campo para fecha y hora
                            name="taken_at"
                            className="w-full border rounded-md p-2"
                            disabled={readOnly}
                        />
                        <ErrorMessage name="taken_at" component="p" className="text-red-500 text-sm" />
                    </div>
                   
                    {!readOnly && (
                        <button type="submit" className={`py-2 px-4 text-black rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}>
                            {mode === 1 ? "Crear" : "Actualizar"}
                        </button>
                    )}
                    {/*Botón de volver */}
                    <button 
                    type="button"
                    className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                    onClick={() => {
                        navigate("/list/motorcycle")
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