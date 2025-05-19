// src/pages/UpdateDriver.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { Driver } from "../../models/Driver";
import { driverService } from "../../services/driverService";
import DriverFormValidator from "../../components/Drivers/DriverFormValidator";


const UpdateDriverPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Obtiene el id de la URL
  const [driver, setDriver] = useState<Driver | null>(null);

  // Cargar datos del conductor después del montaje
  useEffect(() => {
    console.log("Id -> " + id);
    const fetchDriver = async () => {
      if (!id) return; // Si el id no está disponible
      const driverData = await driverService.getDriverById(parseInt(id, 10));
      setDriver(driverData);
    };

    fetchDriver();
  }, [id]);

  const handleUpdateDriver = async (theDriver: Driver) => {
    try {
      const updatedDriver = await driverService.updateDriver(theDriver.id || 0, theDriver);
      if (updatedDriver) {
        Swal.fire({
          title: "Completado",
          text: "Se ha actualizado correctamente el registro",
          icon: "success",
          timer: 3000,
        });
        navigate("/driver/list"); // Redirección en React Router
      } else {
        Swal.fire({
          title: "Error",
          text: "Existe un problema al momento de actualizar el registro",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Existe un problema al momento de actualizar el registro",
        icon: "error",
        timer: 3000,
      });
    }
  };

  if (!driver) {
    return <div>Cargando...</div>; // Mientras se obtienen los datos
  }

  return (
    <>
      <Breadcrumb pageName="Editar Conductor" />
      <DriverFormValidator
        handleUpdate={handleUpdateDriver}
        mode={2} // Actualización
        driver={driver}
        readOnly={false}
      />
    </>
  );
};

export default UpdateDriverPage;