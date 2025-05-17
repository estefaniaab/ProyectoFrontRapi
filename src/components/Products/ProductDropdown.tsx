import React from "react";
import { Product } from "../../models/Product";
import { Field, ErrorMessage } from "formik";

interface ProductDropdownProps {
  products: Product[];
  name: string;
  disabled?: boolean;
}

const ProductDropdown: React.FC<ProductDropdownProps> = ({ products, name, disabled }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-lg font-medium text-gray-700">
        Producto
      </label>
      <Field as="select" name={name} className="w-full border rounded-md p-2" disabled={disabled}>
        <option value="0">Seleccione un producto</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
    </div>
  );
};

export default ProductDropdown;