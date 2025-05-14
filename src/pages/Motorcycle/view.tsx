import { useParams } from "react-router-dom";
import { Motorcycle } from "../../models/Motorcycle";
import { useEffect, useState } from "react";
import { motorcycleService } from "../../services/motorcycleServices";
import Breadcrumb from "../../components/Breadcrumb";
import MotorcycleFormValidator from "../../components/Motorcycles/MotorcycleFormValidator";



const ViewMotorcyclePage = () => {
    const { id } = useParams();
    const [motorcycle, setMotorcycle] = useState<Motorcycle | null> (null);

    // Cargar datos del usuario:
    useEffect(() => {
        console.log("Id ->" + id);
        const fetchMotorcycle = async () => {
            if (!id) return // Si el id no esta disponible 
            const motorcylceData = await motorcycleService.getMotorcycleById(parseInt(id));
            setMotorcycle(motorcylceData);            
        };

        fetchMotorcycle();
    }, [id]);
    if (!motorcycle) {
        return <div className="p-4 text-gray-600">Cargando...</div>
    }
    return (
        <>
            <Breadcrumb pageName="Ver Motocicleta" />
            <MotorcycleFormValidator 
                mode={2}
                motorcycle={motorcycle}
                readOnly={true}
            />
        </>
    );
};
export default ViewMotorcyclePage