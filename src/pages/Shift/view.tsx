// src/pages/ViewShift.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"
import { shiftService } from "../../services/shiftService";
import { Shift } from "../../models/Shift";
import Breadcrumb from "../../components/Breadcrumb";
import ShiftFormValidator from "../../components/Shift/ShiftFormValidator";

const ViewShift = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [shift, setShift] = useState<Shift | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchShift = async () => {
      if (!id) {
        Swal.fire({
          title: "Error",
          text: "ID de turno no válido",
          icon: "error",
          timer: 3000,
        });
        navigate("/shift/list");
        return;
      }

      try {
        const shiftData = await shiftService.getShiftById(parseInt(id, 10));
        if (shiftData) {
          setShift(shiftData);
        } else {
          Swal.fire({
            title: "Error",
            text: "No se encontró el turno",
            icon: "error",
            timer: 3000,
          });
          navigate("/shift/list");
        }
      } catch (error) {
        console.error("Error al obtener el turno:", error);
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al cargar el turno",
          icon: "error",
          timer: 3000,
        });
        navigate("/shift/list");
      } finally {
        setLoading(false);
      }
    };

    fetchShift();
  }, [id, navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!shift) {
    return null; // O podrías redirigir aquí si prefieres
  }

  return (
    <div>
      <h2>Ver Turno</h2>
      <Breadcrumb pageName="Ver Turno" />
      <ShiftFormValidator
        mode={3}
        readOnly={true}
        shift={shift}
      />
    </div>
  );
};

export default ViewShift;