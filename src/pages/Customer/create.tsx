import React, {useState} from "react";
import { Customer } from "../../models/Customer";
import CustomerFormValidator from "../../components/Customers/CustomerFormValidator";
import Swal from "sweetalert2";
import { customerService } from "../../services/customerService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";

const App = () => {
    // Inicializamos el navigate
    const navigate = useNavigate();

    // Lógica de creación
    const handleCreateCustomer = async (customer: Customer) => {
        try {
            const createdCustomer = await customerService.createCustomer(customer);
            if (createdCustomer) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log('Customer creado con exito:', createdCustomer);
                navigate('/list/customers'); // Volvemos a la pagina de listado
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            })
        }
    };
    return (
        <div>
            {/* Formulario para crear un nuevo customer */}
            <h2>Create Customer</h2>
                <Breadcrumb pageName="Crear Customer" />
                <CustomerFormValidator
                    handleCreate={handleCreateCustomer}
                    mode={1} // Creación
                    readOnly={false}
                />
        </div>
    );
};

export default App;