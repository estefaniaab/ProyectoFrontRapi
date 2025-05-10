import { Permission } from "../../models/Permission";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Definimos la interfaz para los props
interface MyFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Permission) => void;
    handleUpdate?: (values: Permission) => void;
    permission?: Permission | null;
}



const PermissionFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, permission }) => {

    const handleSubmit = (formattedValues: Permission) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);  // Si `handleCreate` está definido, lo llamamos
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Si `handleUpdate` está definido, lo llamamos
        } else {
            console.error('No function provided for the current mode');
        }
    };

    return (
        <Formik
            initialValues={permission ? permission :{
                id: 0,  // Temporalmente
                name: "",
                methods: "",
                url: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("El nombre es obligatorio"),
                methods: Yup.string().required("Los metodos son obligatorios"),
                url: Yup.string().required("El URL es necesario para que funcione esta compañia")
            })}

            onSubmit={(values) => {             // Los 3 puntos son para clonar la información
                const formattedValues = { ...values, id: mode === 1 ? Date.now(): permission?.id ?? 0};  // Formateo adicional si es necesario
                handleSubmit(formattedValues);
            }}
            
        >
            {({ handleSubmit }) => (
                // Al darle click se manda la información
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                        <Field type="text" name="name" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Methods</label>
                        <Field type="text" name="description" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
                    </div>

                    
                    {/* URL */}
                    <div>
                        <label htmlFor="url" className="block text-lg font-medium text-gray-700">URL</label>
                        <Field type="text" name="url" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="url" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className={`py-2 px-4 text-black rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default PermissionFormValidator;