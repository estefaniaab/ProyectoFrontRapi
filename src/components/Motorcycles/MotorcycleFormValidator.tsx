import { useNavigate } from "react-router-dom";
import { Motorcycle } from "../../models/Motorcycle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MyFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar) o 3 (Vizualizar)
    handleCreate?: (values: Motorcycle) => void;
    handleUpdate?: (values: Motorcycle) => void;
    readOnly?: boolean;
    motorcycle?: Motorcycle | null;
}

const MotorcycleFormValidator: React.FC<MyFormProps> = ({mode, handleCreate, handleUpdate, readOnly, motorcycle}) => {
    const navigate = useNavigate()
    const handleSubmit = (formattedValues: Motorcycle) => {
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
            initialValues={motorcycle ? motorcycle : {
                license_plate: "",
                brand: "",
                year: undefined,
                status: "Activa"
            }}
            validationSchema={Yup.object({
                license_plate: Yup.string().required('La placa es obligatoria'),
                brand: Yup.string().required('La marca es obligatoria'),
                year: Yup.number().min(1900, 'El año debe ser mayor a 1900').max(new Date().getFullYear(), 'El año no puede ser mayor al actual').required('El año es obligatorio'),
                status: Yup.string().oneOf(['Activo', 'Inactivo'], 'El estado debe ser activo o inactivo').required('El estado es obligatorio')
            })}

            onSubmit={(values) => {
                const formattedValues = { ...values};
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                // Al darle click se manda la información
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Placa */}
                    <div>
                        <label htmlFor="license_plate" className="block text-lg font-medium text-gray-700">Placa</label>
                        <Field type="text" name="license_plate" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="license_plate" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Marca */}
                    <div>
                        <label htmlFor="brand" className="block text-lg font-medium text-gray-700">Marca</label>
                        <Field type="text" name="brand" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="brand" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Año */}
                    <div>
                        <label htmlFor="year" className="block text-lg font-medium text-gray-700">Año/Modelo</label>
                        <Field type="number" name="year" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="year" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Estado */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
                        <Field as="select" name="status" className="w-full border rounded-md p-2" disabled={readOnly}>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </Field>
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
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
                        navigate("/motorcycle/list")
                    }}
                    >
                        Volver
                    </button>

                </Form>
            )}
        </Formik>
    );
};

export default MotorcycleFormValidator;

