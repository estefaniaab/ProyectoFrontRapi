// src/pages/CreateShift.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { shiftService } from "../../services/shiftService";
import { Shift } from "../../models/Shift";
import Breadcrumb from "../../components/Breadcrumb";
import ShiftFormValidator from "../../components/Shift/ShiftFormValidator";

const CreateShift = () => {
  const navigate = useNavigate();

  const handleCreateShift = async (shift: Omit<Shift, "id">) => {
    try {
      const createdShift = await shiftService.createShift(shift);
      if (createdShift) {
        Swal.fire({
          title: "Completado",
          text: "Se ha creado correctamente el turno",
          icon: "success",
          timer: 3000,
        });
        navigate("/shift/list");
      } else {
        Swal.fire({
          title: "Error",
          text: "Existe un problema al momento de crear el turno",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error al crear el turno:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado al crear el turno",
        icon: "error",
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <h2>Crear Turno</h2>
      <Breadcrumb pageName="Crear Turno" />
      <ShiftFormValidator
        handleCreate={handleCreateShift}
        mode={1}
        readOnly={false}
      />
    </div>
  );
};

export default CreateShift;