import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../models/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Product } from "../../models/Product";

interface MyFormProps {
  mode: number; // 1 (crear), 2 (actualizar), 3 (visualizar)
  handleCreate?: (values: Menu) => void;
  handleUpdate?: (values: Menu) => void;
  readOnly?: boolean;
  menu?: Menu | null;
  restaurantId?:number;
  products?:Product[]

}

const MenuFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, menu, restaurantId,products=[] }) => {
  const navigate = useNavigate();
  


  const handleSubmit = (formattedValues: Menu) => {
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error("No function provided for the current mode");
    }
  };

  return (
    <Formik
      initialValues={
        menu? { 
            restaurant_id:menu.restaurant_id,
            product_id:menu.product_id,
            price:menu.price,
            availability: menu.availability.toString()

         } // Convertimos el booleano a string para el formulario
          : {
              restaurant_id: restaurantId,
              product_id: 0,
              price: 0,
              availability: "true", // Valor inicial como string
            }
      }
      validationSchema={Yup.object({
        restaurant_id: Yup.number()
                    .required("El ID del restaurante es obligatorio")
                    .positive("Debe ser un número positivo")
                    .integer("Debe ser un número entero"),
        product_id: Yup.number()
            .required("Debes seleccionar un producto")
            .positive("Debes seleccionar un producto")
            .integer("Debe ser un número entero")
            .notOneOf([0], "Debes seleccionar un producto válido"),
        price: Yup.number()
          .min(0, "El precio no puede ser negativo")
          .required("El precio es obligatorio"),
        availability: Yup.string()
          .oneOf(["true", "false"], "La disponibilidad debe ser Sí o No")
          .required("La disponibilidad es obligatoria"),
      })}
      onSubmit={(values) => {
        // Convertimos el valor de available de string a boolean antes de enviar
        const formattedValues: Menu = {
            restaurant_id: values.restaurant_id,
                    product_id: values.product_id,
                    price: values.price,
                    availability: values.availability === "true",
        };
        handleSubmit(formattedValues);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          {/* ID del Restaurante */}
            <div>
                <label htmlFor="restaurant_id" className="block text-lg font-medium text-gray-700">
                    ID del Restaurante
                </label>
                <Field
                    type="number"
                    name="restaurant_id"
                    className="w-full border rounded-md p-2"
                    disabled={readOnly || restaurantId !== undefined}
                />
                <ErrorMessage name="restaurant_id" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Producto */}
            <div>
                <label htmlFor="product_id" className="block text-lg font-medium text-gray-700">
                    Producto
                </label>
                {readOnly && mode === 3 ? (
                    <p className="w-full border rounded-md p-2 bg-gray-100">
                        {menu?.product?.name || `Producto ${menu?.product_id || 0}`}
                    </p>
                ) : (
                    <Field as="select" name="product_id" className="w-full border rounded-md p-2" disabled={readOnly}>
                        <option value="0">Seleccione un producto</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </Field>
                )}
                <ErrorMessage name="product_id" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Precio */}
            <div>
                <label htmlFor="price" className="block text-lg font-medium text-gray-700">
                    Precio
                </label>
                <Field type="number" name="price" step="0.01" className="w-full border rounded-md p-2" disabled={readOnly} />
                <ErrorMessage name="price" component="p" className="text-red-500 text-sm" />
            </div>


          {/* Disponibilidad */}
          <div>
            <label htmlFor="availability" className="block text-lg font-medium text-gray-700">
              Disponible
            </label>
            <Field as="select" name="availability" className="w-full border rounded-md p-2" disabled={readOnly}>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </Field>
            <ErrorMessage name="availability" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Botón de enviar */}
          {!readOnly && (
            <button
              type="submit"
              className={`py-2 px-4 text-black rounded-md ${
                mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {mode === 1 ? "Crear" : mode === 2 ? "Actualizar" : ""}
            </button>
          )}

          {/* Botón de volver */}
          <button
            type="button"
            className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
            onClick={() => {
              navigate("/menu/list");
            }}
          >
            Volver
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MenuFormValidator;