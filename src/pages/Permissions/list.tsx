import { Eye, Edit, Trash2 } from "lucide-react"; // Es la libreria de los Iconos bonitos
import { useState, useEffect } from "react"; 

import { permissionService } from "../../services/permissionService"; // Se esta solicitando al acceso de datos, para cargar la API
import Swal from "sweetalert2"; // Hace que salgan las aletras bonitas, como animadas
import { Permission } from "../../models/Permission"; // Se coge el modelo
import GenericTable from "../../components/GenericTable";


const ListPermissions = () => {
    // Estado para almacenar los datos del JSON
    const [data, setData] = useState<Permission[]>([]);

    // 🔹 Llamar `fetchData` cuando el componente se monta
    useEffect(() => { // useEffect es el metodo que se utiliza cuando se carga la pagina
        fetchData(); // Este saca la información
    }, []);

    // 🔹 Obtiene los datos de los usuarios
    const fetchData = async () => {  
        const data = await permissionService.getPermission(); // Se va al backend
        setData(data); // Actualiza la variable reactiva data
    };

    const handleAction = (action: string, item: Permission) => {
        if (action == 'view') {
            handleView(item.id)
        } else if (action == 'edit') {
            handleEdit(item.id);
        } else if (action == 'delete') {
            handleDelete(item.id);
        }
    }

    // Funciones para manejar las acciones
    const handleView = (id: number) => {
        console.log(`Ver registro con ID: ${id}`);

    };

    const handleEdit = (id: number) => {
        console.log(`Editar registro con ID: ${id}`);

        // Lógica para editar el registro
    };

    const handleDelete = async (id: number) => {
        console.log(`Intentando eliminar permiso con ID: ${id}`);
        Swal.fire({
            title: "Eliminación",
            text: "Está seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await permissionService.deletePermission(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "El registro se ha eliminado",
                        icon: "success"
                    });
                }
                // 🔹 Vuelve a obtener los usuarios después de eliminar uno
                fetchData();
            }
        });
    };

    // Definir columnas
    const columns = ["name","methods", "url"]

    // Definir acciones e iconos
    const actions = [
        { name: "view", icon: <Eye size={20} />},
        { name: "edit", icon: <Edit size={20} />},
        { name: "delete", icon: <Trash2 size={20} />},
    ];

    return (
        <div className="grid grid-cols-1 gap-9">
            <GenericTable data={data} columns={columns} actions={actions} onAction={handleAction}></GenericTable>
        </div>
    )
};

export default ListPermissions;
