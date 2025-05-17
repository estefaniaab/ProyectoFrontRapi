import { useNavigate } from "react-router-dom";
import { motorcycleService } from "../../services/motorcycleServices";
import Swal from "sweetalert2";
import MotorcycleFormValidator from "../../components/Motorcycles/MotorcycleFormValidator";
import Breadcrumb from "../../components/Breadcrumb";



const App = () => {
    // Inicializamos el navegaddor
    const navigate = useNavigate();

    // Lógica de creación
    const handleCreateMotorcycle = async (motorcycle: any) => {
        try {
            const createdMotorcycle = await motorcycleService.createMotorcycle(motorcycle);
            if (createdMotorcycle) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000

                })

            // Aquí iría la lógica para crear la motocicleta
            console.log('Motocicleta creado con exito:', motorcycle);
            navigate('/motorcycle/list'); // Volvemos a la pagina de listado
            }
            else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            console.error('Error al crear la motocicleta:', error);
        }
    };
    return (
        <div>
            {/* Formulario para crear un nuevo customer */}
            <h2>Crear Motocicleta</h2>
            <Breadcrumb pageName="Crear Motocicleta" />
            <MotorcycleFormValidator
                handleCreate={handleCreateMotorcycle}
                mode={1} // Creación
                readOnly={false}
            />
        </div>
    )
};
export default App;