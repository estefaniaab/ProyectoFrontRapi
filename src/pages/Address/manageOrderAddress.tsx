import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { addressService } from "../../services/addressService";
import { Address } from "../../models/Address";
import AddressFormValidator from "../../components/Address/AddressFormValidator";
import Swal from "sweetalert2";

const ManageOrderAddress: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const numericOrderId = parseInt(orderId ?? "", 10);
    const [address, setAddress] = useState<Address | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddress = async () => {
            setLoading(true);
            const fetchedAddress = await addressService.getAddressByOrderId(numericOrderId);
            setAddress(fetchedAddress);
            setLoading(false);
        };

        if (!isNaN(numericOrderId)) {
            fetchAddress();
        }
    }, [numericOrderId]);

    const handleCreateAddress = async (addressData: Omit<Address, "id" | "order">) => {
        if (isNaN(numericOrderId)) {
            Swal.fire("Error", "ID de orden inválido.", "error");
            return;
        }
        try {
            const addressToCreate = { ...addressData, order_id: numericOrderId };
            const createdAddress = await addressService.createAddress(addressToCreate);
            if (createdAddress) {
                Swal.fire("Éxito", "Dirección creada.", "success").then(() => {
                    setAddress(createdAddress); // Actualizar el estado para mostrar la dirección creada
                });
            } else {
                Swal.fire("Error", "No se pudo crear la dirección.", "error");
            }
        } catch (error) {
            console.error("Error al crear la dirección:", error);
            Swal.fire("Error", "Error al crear la dirección.", "error");
        }
    };

    const handleUpdateAddress = async (updatedAddressData: Address) => {
        if (!address?.id) {
            Swal.fire("Error", "No hay dirección para actualizar.", "error");
            return;
        }
        try {
            const updated = await addressService.updateAddress(address.id, updatedAddressData);
            if (updated) {
                Swal.fire("Éxito", "Dirección actualizada.", "success").then(() => {
                    setAddress(updated);
                });
            } else {
                Swal.fire("Error", "No se pudo actualizar la dirección.", "error");
            }
        } catch (error) {
            console.error("Error al actualizar la dirección:", error);
            Swal.fire("Error", "Error al actualizar la dirección.", "error");
        }
    };

    const handleDeleteAddress = async () => {
        if (!address?.id) {
            Swal.fire("Error", "No hay dirección para eliminar.", "error");
            return;
        }
        Swal.fire({
            title: "¿Eliminar dirección?",
            text: "¿Estás seguro de eliminar esta dirección?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await addressService.deleteAddress(address.id!);
                if (success) {
                    Swal.fire("Éxito", "Dirección eliminada.", "success").then(() => {
                        setAddress(null); // Actualizar el estado
                    });
                } else {
                    Swal.fire("Error", "No se pudo eliminar la dirección.", "error");
                }
            }
        });
    };

    const handleGoBackToOrder = () => {
        navigate(`/order/view/${orderId}`);
    };

    if (loading) {
        return (
            <div>
                <Breadcrumb pageName={`Dirección de la Orden #${orderId}`} />
                <div className="p-6 bg-white rounded-md shadow-md">
                    <p>Cargando dirección...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Breadcrumb pageName={`Dirección de la Orden #${orderId}`} />
            <div className="p-6 bg-white rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Gestionar Dirección de la Orden #{orderId}</h2>

                {address ? (
                    <div>
                        <h3>Dirección Existente:</h3>
                        <p>Calle: {address.street}</p>
                        <p>Ciudad: {address.city}</p>
                        <p>Estado: {address.state}</p>
                        <p>Código Postal: {address.postal_code || 'N/A'}</p>
                        <p>Información Adicional: {address.aditional_info || 'N/A'}</p>

                        <button
                            onClick={() => navigate(`/address/update/${address.id}`)} // Podemos crear un nuevo componente UpdateAddress o usar el form en modo editar
                            className="py-2 px-4 text-yellow-600 rounded-md hover:underline mr-2"
                        >
                            Editar
                        </button>
                        <button
                            onClick={handleDeleteAddress}
                            className="py-2 px-4 text-red-600 rounded-md hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                ) : (
                    <div>
                        <h3>No hay dirección para esta orden.</h3>
                        <AddressFormValidator
                            handleCreate={handleCreateAddress}
                            mode={1}
                            readOnly={false}
                            orderId={numericOrderId}
                        />
                    </div>
                )}

                <button
                    onClick={handleGoBackToOrder}
                    className="mt-4 py-2 px-4 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                >
                    Volver a la Orden
                </button>
            </div>
        </div>
    );
};

export default ManageOrderAddress;