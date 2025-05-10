import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { roleService } from "../../services/roleService";
import Swal from "sweetalert2";

import { Role } from '../../models/Role';
import RoleFormValidator from "../../components/Roles/RolesFormValidator";
import Breadcrumb from "../../components/Breadcrumb";

const UpdateRolesPage = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [role, setUser] = useState<Role | null>(null);

    // Cargar datos del usuario después del montaje
    useEffect(() => {
        console.log("Id->"+id)
        const fetchUser = async () => {
            if (!id) return; // Evitar errores si el ID no está disponible
            const roleData = await roleService.getRoleById(parseInt(id));
            setUser(roleData);
        };

        fetchUser();
    }, [id]);

    const handleUpdateRole = async (theRole: Role) => {
        try {
            const updatedRole = await roleService.updateRole(theRole.id || 0, theRole);
            if (updatedRole) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/roles/list"); // Redirección en React Router
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

    if (!role) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Rol" />
            <RoleFormValidator
                handleUpdate={handleUpdateRole}
                mode={2} // 2 significa actualización
                role={role}
            />
        </>
    );
};

export default UpdateRolesPage;