import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { Address } from "../../models/Address";
import { addressService } from "../../services/addressService";
import AddressFormValidator from "../../components/Address/AddressFormValidator";

const CreateAddress: React.FC = () => {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId?: string }>();
    const numericOrderId = orderId ? parseInt(orderId, 10) : undefined;

    const handleCreateAddress = async (addressData: Omit<Address, "id" | "order">) => {
        if (numericOrderId === undefined) {
            Swal.fire({
                title: "Error",
                text: "No se proporcionó el ID de la orden para la dirección.",
                icon: "error",
                timer: 3000,
            });
            return;
        }

        try {
            const addressToCreate = { ...addressData, order_id: numericOrderId };
            const createdAddress = await addressService.createAddress(addressToCreate);
            if (createdAddress) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado la dirección correctamente",
                    icon: "success",
                    timer: 3000,
                });
                navigate(`/order/view/${numericOrderId}`); // Redirigir a la vista de la orden
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al crear la dirección",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            console.error("Error al crear la dirección:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear la dirección",
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <Breadcrumb pageName="Crear Dirección" />
            <AddressFormValidator
                handleCreate={handleCreateAddress}
                mode={1}
                readOnly={false}
                orderId={numericOrderId}
            />
        </div>
    );
};

export default CreateAddress;