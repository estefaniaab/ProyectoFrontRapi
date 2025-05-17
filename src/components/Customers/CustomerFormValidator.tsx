import { Customer } from "../../models/Customer";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definir interfaz para los props (Son como los parametros)
interface MyFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar) o 3 (Vizualizar)
    handleCreate?: (values: Customer) => void;
    handleUpdate?: (values: Customer) => void;
    readOnly?: boolean;
    customer?: Customer | null;
}

const CustomerFormValidator: React.FC<MyFormProps> = ({mode, handleCreate, handleUpdate, readOnly, customer}) => {
    const navigate = useNavigate()
    const handleSubmit = (formattedValues: Customer) => {
        if (mode == 1 && handleCreate) {
            handleCreate(formattedValues); // Si handleCreate esta definido, se llama
        } else if (mode == 2 && handleUpdate) {
            handleUpdate(formattedValues); // Si handleUpdate esta definido lo llama
        } else {
            console.error('No function provided for the current mode');
        }
    };

    return (
        <Formik
            initialValues={customer ? customer : {
                name: "",
                email: "",
                phone: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('El nombre es obligatorio'),
                email: Yup.string().email('Email inválido').required('El email es obligatorio'),
                phone: Yup.string().matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos')
                .required('El teléfono es obligatorio'),
            })}

            onSubmit={(values) => {
                const formattedValues = { ...values};
                handleSubmit(formattedValues);
            }}

        >
            {({ handleSubmit }) => (
                // Al darle click se manda la información
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                        <Field type="text" name="name" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <Field type="email" name="email" className="w-full border rounded-md p-2" disabled={readOnly}/>
                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone</label>
                        <Field type="text" name="phone" className="w-full border rounded-md p-2"  disabled={readOnly}/>
                        <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Botón de enviar */}
                    {!readOnly && (
                    <button
                        type="submit"
                        className={`py-2 px-4 text-black rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear" : mode ===2 ? "Actualizar" : ""}
                    </button>
                    )}
                    
                    {/*Botón de volver */}
                    <button 
                    type="button"
                    className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                    onClick={() => {
                        navigate("/customers/list")
                    }}
                    >
                        Volver
                    </button>

                </Form>
            )}
        </Formik>
    );
};

export default CustomerFormValidator;