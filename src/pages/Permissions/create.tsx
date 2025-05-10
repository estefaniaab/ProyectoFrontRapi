import React, { useState } from 'react'; // Asegúrate de importar useState
import { Permission } from '../../models/Permission';
import PermissionFormValidator from '../../components/Permissions/PermissionsFormValidator'; 

import Swal from 'sweetalert2';
import { permissionService } from "../../services/permissionService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    // Estado para almacenar el usuario a editar

    // Lógica de creación
    const handleCreatePermission = async (permission: Permission) => {

        try {
            const createdPermission = await permissionService.createPermission(permission);
            if (createdPermission) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Permiso creado con éxito:", createdPermission);
                navigate("/permissions/list");
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
            {/* Formulario para crear un nuevo usuario */}
            <h2>Create Permission</h2>
                <Breadcrumb pageName="Crear permiso" />
                <PermissionFormValidator
                    handleCreate={handleCreatePermission}
                    mode={1} // 1 significa creación
                />
        </div>
    );
};

export default App;
