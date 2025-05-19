import { useParams, useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";

import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { Product } from "../../models/Product";
import { productService } from "../../services/productService";
import ProductFormValidator from "../../components/Products/ProductFormValidator";



const UpdateProduct = () => {
    const navigate = useNavigate();

    const {id} = useParams(); //Obtiene el id de la URL
    const [product, setProduct] = useState<Product | null>(null);

    // Cargar datos del usuario despúes del montaje
    useEffect(() => {
        console.log("Id ->" + id);
        const fetchProduct = async () => {
            if (!id) return // Si el id no esta disponible 
            const productData = await productService.getProductById(parseInt(id));
            setProduct(productData);
        };
        
        fetchProduct();
    }, [id]);

    const handleUpdateProduct = async (theProduct: Product) => {
        try {
            const updatedProduct = await productService.updateProduct(theProduct.id || 0, theProduct);
            if (updatedProduct) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/product/list"); // Redirección en React Router
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };
    if (!product) {
        return <div>Cargando...</div> // Mientras se obtienen los datos
    }
    return (
        <div>
            <Breadcrumb pageName="Actualizar Producto" />
            <ProductFormValidator
                handleUpdate={handleUpdateProduct}
                mode={2} // Actualización
                readOnly={false}
                product={product}
            />
        </div>
    );

}
export default UpdateProduct;