import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import DriverFormValidator from "../../components/Drivers/DriverFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import { driverService } from "../../services/driverService";

const CreateDriver = () => {
    const navigate = useNavigate();

    const handleCreateDriver = async (driver: any) => {
        try {
            const createdDriver = await driverService.createDriver(driver);
            if (createdDriver) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate('/list/driver');
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            console.error('Error al crear el driver:', error);
        }
    };

    return (
        <div>
            <h2>Create Driver</h2>
            <Breadcrumb pageName="Crear Driver" />
            <DriverFormValidator
                handleCreate={handleCreateDriver}
                mode={1}
                readOnly={false}
            />
        </div>
    );
};

export default CreateDriver;