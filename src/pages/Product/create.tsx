import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import Breadcrumb from "../../components/Breadcrumb";
import { productService } from "../../services/productService";
import ProductFormValidator from "../../components/Products/ProductFormValidator";



const App = () => {
    // Inicializamos el navegaddor
    const navigate = useNavigate();

    // Lógica de creación
    const handleCreateProduct = async (product: any) => {
        try {
            const createdProduct = await productService.createProduct(product);
            if (createdProduct) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000

                })

            // Aquí iría la lógica para crear la motocicleta
            console.log('Producto creado con exito:', product);
            navigate('/list/product'); // Volvemos a la pagina de listado
            }
            else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };
    return (
        <div>
            {/* Formulario para crear un nuevo producto */}
            <h2>Create Product</h2>
            <Breadcrumb pageName="Crear Product" />
            <ProductFormValidator
                handleCreate={handleCreateProduct}
                mode={1} // Creación
                readOnly={false}
            />
        </div>
    )
};
export default App;