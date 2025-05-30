// src/components/Shift/ShiftFormValidator.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { shiftService } from "../../services/shiftService";

import { driverService } from "../../services/driverService";
import { Shift } from "../../models/Shift";
import { Motorcycle } from "../../models/Motorcycle";
import { Driver } from "../../models/Driver";
import { motorcycleService } from "../../services/motorcycleServices";
import Swal from "sweetalert2";

interface MyFormProps {
  mode: number; // 1 (create), 2 (update), 3 (view)
  handleCreate?: (values: Shift) => void;
  handleUpdate?: (values: Shift) => void;
  readOnly?: boolean;
  shift?: Shift | null;
}

const ShiftFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, shift }) => {
  const navigate = useNavigate();
  const [availableMotorcycles, setAvailableMotorcycles] = useState<Motorcycle[]>([]);
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);

  // Obtener motos y conductores disponibles
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const shiftsData = await shiftService.getShifts();
        const motorcyclesData = await motorcycleService.getMotorcycles();
        const driversData = await driverService.getDrivers();
        setAvailableMotorcycles(motorcyclesData);
        setAvailableDrivers(driversData);
      } catch (error) {
        console.error("Error fetching availability data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (formattedValues: Shift) => {
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error("No function provided for the current mode");
    }
  };

  const validationSchema = Yup.object({
    motorcycle_id: Yup.number()
      .required("La moto es requerida")
      .positive("Debe ser un número positivo")
      .integer("Debe ser un número entero")
      /*.test(
        "is-available",
        "La moto no está disponible",
        (value) => value !== undefined && availableMotorcycles.some((m) => m.id === value)
      )*/,
    driver_id: Yup.number()
      .required("El conductor es requerido")
      .positive("Debe ser un número positivo")
      .integer("Debe ser un número entero")
      /*.test(
        "is-available",
        "El conductor no está disponible",
        (value) => value !== undefined && availableDrivers.some((d) => d.id === value)
      )*/,
    start_time: Yup.date()
      .required("La fecha de inicio es requerida"),
      /*.test(
        "is-future",
        "La fecha de inicio debe ser futura o actual",
        (value) => value && new Date(value) >= new Date()
      )*/
    end_time: Yup.date()
      .nullable()
      .test(
        "is-after-start",
        "La fecha de fin debe ser posterior a la fecha de inicio",
        function (value) {
          const startTime = this.parent.start_time;
          // Si no se proporciona fecha de fin, la validación pasa
          if (!value || !startTime) return true;
          return new Date(value) > new Date(startTime);
        }
      ),
      
    status: Yup.string()
      .oneOf(["Activo", "Inactivo"], "El estado debe ser Activo o Inactivo")
      .required("El estado es requerido"),
  });

  return (
    <Formik
      initialValues={
        shift
          ? {
              ...shift,
              start_time: shift.start_time ? new Date(shift.start_time).toISOString().slice(0, 16) : "",
              end_time: shift.end_time ? new Date(shift.end_time).toISOString().slice(0, 16) : "",
              motorcycle_id: shift.motorcycle_id || "", // Aseguramos que sea un string para el campo
              driver_id: shift.driver_id || "", // Aseguramos que sea un string para el campo
            }
          : {
              motorcycle_id: "",
              driver_id: "",
              start_time: new Date().toISOString().slice(0, 16),
              end_time: "",
              status: "Activo",
            }
      }
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Si estamos creando, verificamos que la moto y el conductor estén activos.
        if (mode === 1) {
          const selectedMotorcycleId = parseInt(values.motorcycle_id as string, 10);
          const selectedDriverId = parseInt(values.driver_id as string, 10);

          const selectedMotorcycle = availableMotorcycles.find(
            (m) => m.id === selectedMotorcycleId
          );
          const selectedDriver = availableDrivers.find(
            (d) => d.id === selectedDriverId
          );

          if (
            (selectedMotorcycle && selectedMotorcycle.status === "Inactivo") ||
            (selectedDriver && selectedDriver.status === "Inactivo")
          ) {
            Swal.fire({
              title: "Error",
              text: "No se puede crear un turno con una moto o un conductor inactivos.",
              icon: "error",
              timer: 3000,
            });
            navigate("/shift/list");
            return; // Salimos sin crear el turno
          }
        }

        // Construir el objeto base con los datos del formulario.
        const baseValues = {
          motorcycle_id: parseInt(values.motorcycle_id as string, 10),
          driver_id: parseInt(values.driver_id as string, 10),
          start_time: new Date(values.start_time),
          end_time: values.end_time ? new Date(values.end_time) : null,
          status: values.status,
        };

        const formattedValues: Shift = shift?.id
          ? { id: shift.id, ...baseValues }
          : (baseValues as Shift);

        handleSubmit(formattedValues);
      }}

    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          {/* Moto */}
          <div>
            <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">
              Moto
            </label>
            <Field
              as="select"
              name="motorcycle_id"
              className="w-full border rounded-md p-2"
              disabled={readOnly }
            >
              <option value="">Selecciona una moto</option>
              {availableMotorcycles.map((motorcycle: Motorcycle) => (
                <option key={motorcycle.id} value={motorcycle.id || ""}>
                {motorcycle.license_plate}{" "}
                {motorcycle.brand ? `(${motorcycle.brand})` : ""} - {motorcycle.status}
                </option>

              ))}
            </Field>
            <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Conductor */}
          <div>
            <label htmlFor="driver_id" className="block text-lg font-medium text-gray-700">
              Conductor
            </label>
            <Field
              as="select"
              name="driver_id"
              className="w-full border rounded-md p-2"
              disabled={readOnly }
            >
              <option value="">Selecciona un conductor</option>
                {availableDrivers.map((driver: Driver) => (
                  <option key={driver.id} value={driver.id || ""}>
                    {driver.name} {driver.license_number ? `| Licencia: ${driver.license_number}` : ""}{" "}
                    {driver.status}
                  </option>
                ))}
            </Field>
            <ErrorMessage name="driver_id" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Fecha de Inicio */}
          <div>
            <label htmlFor="start_time" className="block text-lg font-medium text-gray-700">
              Fecha de Inicio
            </label>
            <Field
              type="datetime-local"
              name="start_time"
              className="w-full border rounded-md p-2"
              disabled={readOnly}
            />
            <ErrorMessage name="start_time" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Fecha de Fin */}
          <div>
            <label htmlFor="end_time" className="block text-lg font-medium text-gray-700">
              Fecha de Fin (Opcional)
            </label>
            <Field
              type="datetime-local"
              name="end_time"
              className="w-full border rounded-md p-2"
              disabled={readOnly}
            />
            <ErrorMessage name="end_time" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">
              Estado
            </label>
            <Field
              as="select"
              name="status"
              className="w-full border rounded-md p-2"
              disabled={readOnly}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Field>
            <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
          </div>

          {!readOnly && (
            <button
              type="submit"
              className={`py-2 px-4 text-black rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
            >
              {mode === 1 ? "Crear" : mode === 2 ? "Actualizar" : ""}
            </button>
          )}
          <button
            type="button"
            className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
            onClick={() => navigate("/shift/list")}
          >
            Volver
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ShiftFormValidator;