import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import Breadcrumb from "../../components/Breadcrumb";
import { Product } from "../../models/Product";
import { productService } from "../../services/productService";
import ProductFormValidator from "../../components/Products/ProductFormValidator";




const ViewProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null> (null);

    // Cargar datos del usuario:
    useEffect(() => {
        console.log("Id ->" + id);
        const fetchProduct = async () => {
            if (!id) return // Si el id no esta disponible 
            const Data = await productService.getProductById(parseInt(id));
            setProduct(Data);            
        };

        fetchProduct();
    }, [id]);
    if (!product) {
        return <div className="p-4 text-gray-600">Cargando...</div>
    }
    return (
        <>
            <Breadcrumb pageName="Ver Motocicleta" />
            <ProductFormValidator 
                mode={2}
                product={product}
                readOnly={true}
            />
        </>
    );
};
export default ViewProductPage