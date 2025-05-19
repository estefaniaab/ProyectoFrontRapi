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
    const [isEditing, setIsEditing] = useState(false);

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
            console.log("Datos a crear:", addressToCreate); // <--- Agrega esto
            const createdAddressResponse = await addressService.createAddress(addressToCreate);
            const createdAddress = Array.isArray(createdAddressResponse) ? createdAddressResponse[0] : createdAddressResponse; // Extraer la dirección del array

            console.log("Datos del backend:", createdAddress);
            
            if (createdAddress) {
                Swal.fire("Éxito", "Dirección creada.", "success").then(() => {
                    const newAddress = {
                        id: createdAddress.id,
                        street: createdAddress.street,
                        city: createdAddress.city,
                        state: createdAddress.state,
                        postal_code: createdAddress.postal_code,
                        additional_info: createdAddress.additional_info,
                        order_id: createdAddress.order_id,
                        order: {id: numericOrderId} as any,
                    };
                    setAddress(newAddress );
                });
            } else {
                Swal.fire("Error", "No se pudo crear la dirección.", "error");
            }
        } catch (error) {
            console.error("Error al crear la dirección:", error);
            Swal.fire("Error", "Error al crear la dirección.", "error");
        }
    };

    const handleUpdateAddress = async (updatedAddressData: Omit<Address, "id" | "order">) => {
        if (!address?.id) {
            Swal.fire("Error", "No hay dirección para actualizar.", "error");
            return;
        }
        try {
            const updated = await addressService.updateAddress(address.id, { ...updatedAddressData, order_id: numericOrderId });
            if (updated) {
                Swal.fire("Éxito", "Dirección actualizada.", "success").then(() => {
                    setAddress(updated);
                    setIsEditing(false); // Salir del modo edición
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
                        setAddress(null);
                        setIsEditing(false); // Asegurarse de salir del modo edición
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
                <h2 className="text-xl font-bold text-black mb-4">Gestionar Dirección de la Orden #{orderId}</h2>

                {address ? (
                    <div>
                        {isEditing ? (
                            <div>
                                <h3>Editar Dirección:</h3>
                                <AddressFormValidator
                                    mode={2}
                                    handleUpdate={handleUpdateAddress}
                                    readOnly={false}
                                    address={address}
                                    orderId={numericOrderId}
                                />
                                <button onClick={() => setIsEditing(false)} className="mt-2 py-2 px-4 text-gray-700 rounded-md hover:underline">
                                    Cancelar Edición
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3>Dirección Existente:</h3>
                                <p>Calle: {address.street}</p>
                                <p>Ciudad: {address.city}</p>
                                <p>Estado: {address.state}</p>
                                <p>Código Postal: {address.postal_code || 'N/A'}</p>
                                <p>Información Adicional: {address.additional_info || 'N/A'}</p>
                                <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="py-2 px-6 rounded-md bg-gray text-black hover:bg-gray-800
                                            dark:bg-white dark:text-black dark:hover:bg-gray-100
                                            transition-colors duration-200"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={handleDeleteAddress}
                                        className="py-2 px-6 rounded-md bg-gray text-black hover:bg-gray-800
                                            dark:bg-white dark:text-black dark:hover:bg-gray-100
                                            transition-colors duration-200"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        )}
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
                <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full">
                    <button
                        onClick={handleGoBackToOrder}
                        className="py-2 px-6 rounded-md bg-gray text-black hover:bg-gray-800
                            dark:bg-white dark:text-black dark:hover:bg-gray-100
                            transition-colors duration-200"
                    >
                        Ver la Orden
                    </button>
                    <button
                        onClick={() => navigate('/order/list')}
                        className="py-2 px-6 rounded-md bg-gray text-black hover:bg-gray-800
                            dark:bg-white dark:text-black dark:hover:bg-gray-100
                            transition-colors duration-200"
                    >
                        Volver a la lista de ordenes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageOrderAddress;