import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../models/Restaurant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MyFormProps {
    mode: number; // 1 (create), 2 (update), 3 (view)
    handleCreate?: (values: Restaurant) => void;
    handleUpdate?: (values: Restaurant) => void;
    readOnly?: boolean;
    restaurant?: Restaurant | null;
}

const RestaurantFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, restaurant }) => {
    const navigate = useNavigate();

    const handleSubmit = (formattedValues: Restaurant) => {
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
            initialValues={restaurant ? restaurant : {
                name: "",
                address: "",
                phone: "",
                email: ""
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                address: Yup.string().required('Address is required'),
                phone: Yup.string().required('Phone is required'),
                email: Yup.string().email('Invalid email').required('Email is required'),
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
                        <label htmlFor="address" className="block text-lg font-medium text-gray-700">Direccion</label>
                        <Field type="text" name="address" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="address" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Telefono</label>
                        <Field type="text" name="phone" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <Field type="email" name="email" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
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
                        onClick={() => navigate("/restaurant/list")}
                    >
                        Volver
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default RestaurantFormValidator;