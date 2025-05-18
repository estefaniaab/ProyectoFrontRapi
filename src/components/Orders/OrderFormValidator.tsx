import React from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../models/Order";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Motorcycle } from "../../models/Motorcycle";
import { Menu } from "../../models/Menu";
import { Customer } from "../../models/Customer";
import { Restaurant } from "../../models/Restaurant";
import Swal from "sweetalert2";

interface MyFormProps {
    mode: number; // 1 (crear), 2 (actualizar), 3 (visualizar)
    handleCreate?: (values: Omit<Order, "id">) => void;
    handleUpdate?: (values: Order) => void;
    readOnly?: boolean;
    order?: Order | null;
    customers?: Customer[];
    restaurants?: Restaurant[];
    menus?: Menu[];
    motorcycles?: Motorcycle[];
    selectedRestaurantId?: number;
    onRestaurantChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OrderFormValidator: React.FC<MyFormProps> = ({
    mode,
    handleCreate,
    handleUpdate,
    readOnly,
    order,
    customers,
    restaurants,
    menus,
    motorcycles,
    selectedRestaurantId,
    onRestaurantChange,
}) => {
    const navigate = useNavigate();

    const initialValues: Partial<Order> = order
        ? {
            quantity: order.quantity,
            status: order.status,
            customer_id: order.customer_id,
            restaurant_id: order.menu?.restaurant_id,
            menu_id: order.menu_id,
            motorcycle_id: order.motorcycle_id,
            total_price: order.total_price,
        }
        : {
            quantity: 1,
            status: "Pendiente",
            customer_id: undefined,
            restaurant_id: undefined,
            menu_id: undefined,
            motorcycle_id: undefined,
            total_price: 0,
        };

    const handleSubmit = (values: Partial<Order>) => {
        const selectedMenu = menus?.find(menu => menu.id === Number(values.menu_id));

        // Verificación de availability del producto del menu
        if (selectedMenu && !selectedMenu.availability) {
            Swal.fire({
                title: "No Disponible",
                text: `El menu "${selectedMenu.product?.name}" no esta disponible actualmente`,
                icon: "warning",
                timer: 3000,
            });
            return // Detener envio del formulario
        }

        // Aquí calculamos el precio total antes de enviar
        const totalPrice = selectedMenu?.price && values.quantity ? selectedMenu.price * values.quantity : 0;

        const orderToCreate: Omit<Order, "id"> = {
            customer_id: values.customer_id!,
            menu_id: values.menu_id!,
            motorcycle_id: values.motorcycle_id,
            quantity: values.quantity!,
            total_price: totalPrice,
            status: values.status || "pendiente",
        };

        if (mode === 1 && handleCreate) {
            handleCreate(orderToCreate);
        } else if (mode === 2 && handleUpdate && order?.id) {
            handleUpdate({ ...values as Order, id: order.id, total_price: totalPrice });
        } else {
            console.error("No function provided for the current mode");
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                customer_id: Yup.number()
                    .integer("Debe ser un número entero")
                    .required("El cliente es obligatorio")
                    .positive("Debe seleccionar un cliente"),
                restaurant_id: Yup.number()
                    .integer("Debe ser un número entero")
                    .required("El restaurante es obligatorio")
                    .positive("Debe seleccionar un restaurante"),
                menu_id: Yup.number()
                    .integer("Debe ser un número entero")
                    .required("El menú es obligatorio")
                    .positive("Debe seleccionar un menú"),
                quantity: Yup.number()
                    .min(1, "La cantidad debe ser al menos 1")
                    .integer("Debe ser un número entero")
                    .required("La cantidad es obligatoria"),
                motorcycle_id: Yup.number()
                    .integer("Debe ser un número entero")
                    .required("La moto es obligatoria")
                    .positive("Debe seleccionar una motocicleta"),
                status: Yup.string().notRequired(), // El estado podría tener un valor por defecto
                total_price: Yup.number().notRequired(), // El precio total se calculará
            })}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ handleSubmit, values, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Cliente */}
                    {customers && (
                        <div>
                            <label htmlFor="customer_id" className="block text-lg font-medium text-gray-700">Cliente</label>
                            <Field as="select" name="customer_id" className="w-full border rounded-md p-2" disabled={readOnly}>
                                <option value="">Seleccionar Cliente</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name || `Cliente ${customer.id}`}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="customer_id" component="p" className="text-red-500 text-sm" />
                        </div>
                    )}

                    {/* Restaurante */}
                    {restaurants && (
                        <div>
                            <label htmlFor="restaurant_id" className="block text-lg font-medium text-gray-700">Restaurante</label>
                            <Field
                                as="select"
                                name="restaurant_id"
                                className="w-full border rounded-md p-2"
                                disabled={readOnly}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    setFieldValue("restaurant_id", parseInt(e.target.value));
                                    setFieldValue("menu_id", undefined); // Limpiar menú al cambiar restaurante
                                    onRestaurantChange?.(e); // Llamamos a la función pasada como prop
                                }}
                            >
                                <option value="">Seleccionar Restaurante</option>
                                {restaurants.map((restaurant) => (
                                    <option key={restaurant.id} value={restaurant.id}>
                                        {restaurant.name || `Restaurante ${restaurant.id}`}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="restaurant_id" component="p" className="text-red-500 text-sm" />
                        </div>
                    )}

                    {/* Menú (filtrado por restaurante) */}
                    {menus && (
                        <div>
                            <label htmlFor="menu_id" className="block text-lg font-medium text-gray-700">Menú</label>
                            <Field as="select" name="menu_id" className="w-full border rounded-md p-2" disabled={readOnly || !values.restaurant_id}>
                                <option value="">Seleccionar Menú</option>
                                {menus
                                    .filter(menu => selectedRestaurantId ? menu.restaurant_id === selectedRestaurantId : false)
                                    .map((menu) => (
                                        <option key={menu.id} value={menu.id}>
                                            {menu.product?.name || `Menú ${menu.id}`} - ${menu.price} ({menu.availability ? 'Disponible' : 'No Disponible'})
                                        </option>
                                    ))}
                            </Field>
                            <ErrorMessage name="menu_id" component="p" className="text-red-500 text-sm" />
                        </div>
                    )}

                    {/* Cantidad */}
                    <div>
                        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Cantidad</label>
                        <Field type="number" name="quantity" className="w-full border rounded-md p-2" disabled={readOnly} />
                        <ErrorMessage name="quantity" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Motocicleta */}
                    {motorcycles && (
                        <div>
                            <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">Motocicleta (Opcional)</label>
                            <Field as="select" name="motorcycle_id" className="w-full border rounded-md p-2" disabled={readOnly}>
                                <option value="">Seleccionar Motocicleta (Opcional)</option>
                                {motorcycles.map((motorcycle) => (
                                    <option key={motorcycle.id} value={motorcycle.id}>
                                        {motorcycle.license_plate || `Motocicleta ${motorcycle.id}`}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex gap-2">
                        {!readOnly && (
                            <button
                                type="submit"
                                className={`py-2 px-4 text-black rounded-md ${
                                    mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                                }`}
                            >
                                {mode === 1 ? "Crear Orden" : mode === 2 ? "Actualizar Orden" : ""}
                            </button>
                        )}
                        <button
                            type="button"
                            className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                            onClick={() => navigate("/order/list")}
                        >
                            Volver
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default OrderFormValidator;