import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";

import { Customer } from "../../models/Customer";
import { customerService } from "../../services/customerService";
import CustomerFormValidator from "../../components/Customers/CustomerFormValidator";

const UpdateCustomerPage = () => {
    const navigate = useNavigate()

    const { id } = useParams(); //Obtiene el id de la URL
    const [customer, setCustomer] = useState<Customer | null>(null);

    // Cargar datos del usuario despúes del montaje
    useEffect(() => {
        console.log("Id ->" + id);
        const fetchCustomer = async () => {
            if (!id) return // Si el id no esta disponible 
            const customerData = await customerService.getCustomerById(parseInt(id));
            setCustomer(customerData);
        };
        
        fetchCustomer();
    }, [id]);

    const handleUpdateCustomer = async (theCustomer: Customer) => {
        try {
            const updatedCustomer = await customerService.updateCustomer(theCustomer.id || 0, theCustomer);
            if (updatedCustomer) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/list/customers"); // Redirección en React Router
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

    if (!customer) {
        return <div>Cargando...</div> // Mientras se obtienen los datos
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Customer" />
            <CustomerFormValidator
                handleUpdate={handleUpdateCustomer}
                mode={2} // Actualizacion
                customer={customer}
                readOnly={false}
            />
        </>
    );
};

export default UpdateCustomerPage