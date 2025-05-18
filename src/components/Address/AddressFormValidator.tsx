import React from "react";
import { useNavigate } from "react-router-dom";
import { Address } from "../../models/Address";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Order } from "../../models/Order";

interface AddressFormProps {
    mode: number; // 1 (crear), 2 (actualizar), 3 (visualizar)
    handleCreate?: (values: Omit<Address, "id" | "order">) => void;
    handleUpdate?: (values: Address) => void;
    readOnly?: boolean;
    address?: Address | null;
    orderId?: number; // Necesitamos el orderId para relacionar la dirección
}

const AddressFormValidator: React.FC<AddressFormProps> = ({
    mode,
    handleCreate,
    handleUpdate,
    readOnly,
    address,
    orderId,
}) => {
    const navigate = useNavigate();

    const initialValues: Partial<Address> = address
        ? {
            street: address.street,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            aditional_info: address.aditional_info,
        }
        : {
            street: "",
            city: "",
            state: "",
            postal_code: "",
            aditional_info: "",
        };

    const handleSubmit = (values: Partial<Address>) => {
        const addressToSubmit: Omit<Address, "id" | "order"> = {
            street: values.street!,
            city: values.city!,
            state: values.state!,
            postal_code: values.postal_code!,
            aditional_info: values.aditional_info,
            order_id: orderId, // Aseguramos de adjuntar el orderId
        };

        if (mode === 1 && handleCreate) {
            handleCreate(addressToSubmit);
        } else if (mode === 2 && handleUpdate && address?.id) {
            handleUpdate({ ...values as Address, id: address.id, order_id: orderId, order: address.order });
        } else {
            console.error("No function provided for the current mode");
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                street: Yup.string().required("La calle es obligatoria"),
                city: Yup.string().required("La ciudad es obligatoria"),
                state: Yup.string().required("El estado/provincia es obligatorio"),
                postal_code: Yup.string().notRequired(),
                aditional_info: Yup.string().notRequired(),
            })}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    <div>
                        <label htmlFor="street" className="block text-lg font-medium text-gray-700">Calle</label>
                        <Field type="text" name="street" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="street" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-lg font-medium text-gray-700">Ciudad</label>
                        <Field type="text" name="city" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="state" className="block text-lg font-medium text-gray-700">Estado/Provincia</label>
                        <Field type="text" name="state" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="state" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="postal_code" className="block text-lg font-medium text-gray-700">Código Postal (Opcional)</label>
                        <Field type="text" name="postal_code" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="postal_code" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="aditional_info" className="block text-lg font-medium text-gray-700">Información Adicional (Opcional)</label>
                        <Field as="textarea" name="aditional_info" className="w-full border rounded-md p-2" rows={3} disabled={readOnly} />
                        <ErrorMessage name="aditional_info" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div className="flex gap-2">
                        {!readOnly && (
                            <button
                                type="submit"
                                className={`py-2 px-4 text-black rounded-md ${
                                    mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                                }`}
                            >
                                {mode === 1 ? "Crear Dirección" : mode === 2 ? "Actualizar Dirección" : ""}
                            </button>
                        )}
                        <button
                            type="button"
                            className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                            onClick={() => navigate("/order/list")} // Podemos ajustar la navegación si es necesario
                        >
                            Volver
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddressFormValidator;