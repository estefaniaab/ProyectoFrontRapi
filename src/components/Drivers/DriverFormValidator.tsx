import { useNavigate } from "react-router-dom";
import { Driver } from "../../models/Driver";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MyFormProps {
    mode: number; // 1 (create), 2 (update), 3 (view)
    handleCreate?: (values: Driver) => void;
    handleUpdate?: (values: Driver) => void;
    readOnly?: boolean;
    driver?: Driver | null;
}

const DriverFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, driver }) => {
    const navigate = useNavigate();

    const handleSubmit = (formattedValues: Driver) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);
        } else {
            console.error('No function provided for the current mode');
        }
    };

    return (
        <Formik
            initialValues={driver ? driver : {
                name: "",
                license_number: "",
                email: "",
                phone: "",
                status: "active"
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Nombre es requerido'),
                license_number: Yup.string().required('El número de la licencia es requerido'),
                email: Yup.string().email('Email invalido').required('El email es requerido'),
                phone: Yup.string().matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos').required('El teléfono es obligatorio'),
                status: Yup.string().oneOf(['Activo', 'Inactivo'], 'El estado debe ser Activo o Inactivo').required('Estado es requerido')
            })}
            onSubmit={(values) => {
                const formattedValues = { ...values };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
                        <Field type="text" name="name" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="license_number" className="block text-lg font-medium text-gray-700">Licencia</label>
                        <Field type="text" name="license_number" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="license_number" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <Field type="email" name="email" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Telefono</label>
                        <Field type="text" name="phone" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
                        <Field as="select" name="status" className="w-full border rounded-md p-2" disabled={readOnly}>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </Field>
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>
                    {!readOnly && (
                        <button
                            type="submit"
                            className={`py-2 px-4 text-black rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                        >
                            {mode === 1 ? "Crear" : mode === 2 ? "Actualizar" : ""}
                        </button>
                    )}
                    <button
                        type="button"
                        className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                        onClick={() => navigate("/driver/list")}
                    >
                        Volver
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default DriverFormValidator;