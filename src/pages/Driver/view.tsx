import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Driver } from "../../models/Driver";

import Breadcrumb from "../../components/Breadcrumb";
import DriverFormValidator from "../../components/Drivers/DriverFormValidator";
import { driverService } from "../../services/driverService";

const ViewDriverPage = () => {
    const { id } = useParams();
    const [driver, setDriver] = useState<Driver | null>(null);

    useEffect(() => {
        const fetchDriver = async () => {
            if (!id) return;
            const driverData = await driverService.getDriverById(parseInt(id));
            setDriver(driverData);
        };
        fetchDriver();
    }, [id]);

    if (!driver) return <div className="p-4 text-gray-600">Cargando...</div>;

    return (
        <>
            <Breadcrumb pageName="Ver Conductor" />
            <DriverFormValidator mode={3} driver={driver} readOnly={true} />
        </>
    );
};

export default ViewDriverPage;