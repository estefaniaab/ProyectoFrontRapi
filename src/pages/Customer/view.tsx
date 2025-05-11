import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

import { Customer } from "../../models/Customer";
import { customerService } from "../../services/customerService";
import CustomerFormValidator from "../../components/Customers/CustomerFormValidator";

const ViewCustomerPage = () => {

    const { id } = useParams();
    const [customer, setCustomer] = useState<Customer | null> (null);

    // Cargar datos del usuario:
    useEffect(() => {
        console.log("Id ->" + id);
        const fetchCustomer = async () => {
            if (!id) return // Si el id no esta disponible 
            const customerData = await customerService.getCustomerById(parseInt(id));
            setCustomer(customerData);            
        };

        fetchCustomer();
    }, [id]);

    if (!customer) {
        return <div className="p-4 text-gray-600">Cargando...</div>
    }
    return (
        <>
            <Breadcrumb pageName="Ver Customer" />
            <CustomerFormValidator 
                mode={2}
                customer={customer}
                readOnly={true}
            />
        </>
    );
};

export default ViewCustomerPage