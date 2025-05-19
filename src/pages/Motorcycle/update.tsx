import { useParams, useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { Motorcycle } from "../../models/Motorcycle";
import { motorcycleService } from "../../services/motorcycleServices";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import MotorcycleFormValidator from "../../components/Motorcycles/MotorcycleFormValidator";


const UpdateMotorcycle = () => {
    const navigate = useNavigate();

    const {id} = useParams(); //Obtiene el id de la URL
    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

    // Cargar datos del usuario despúes del montaje
    useEffect(() => {
        console.log("Id ->" + id);
        const fetchMotorcycle = async () => {
            if (!id) return // Si el id no esta disponible 
            const motorcycleData = await motorcycleService.getMotorcycleById(parseInt(id));
            setMotorcycle(motorcycleData);
        };
        
        fetchMotorcycle();
    }, [id]);

    const handleUpdateMotorcycle = async (theMotorcycle: Motorcycle) => {
        try {
            const updatedMotorcycle = await motorcycleService.updateMotorcycle(theMotorcycle.id || 0, theMotorcycle);
            if (updatedMotorcycle) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/motorcycle/list"); // Redirección en React Router
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
    if (!motorcycle) {
        return <div>Cargando...</div> // Mientras se obtienen los datos
    }
    return (
        <div>
            <Breadcrumb pageName="Actualizar Motocicleta" />
            <MotorcycleFormValidator
                handleUpdate={handleUpdateMotorcycle}
                mode={2} // Actualización
                readOnly={false}
                motorcycle={motorcycle}
            />
        </div>
    );

}
export default UpdateMotorcycle;