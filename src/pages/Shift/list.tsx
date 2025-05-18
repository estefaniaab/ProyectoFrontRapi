// src/components/Shift/ListShift.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shiftService } from "../../services/shiftService";

import { driverService } from "../../services/driverService";
import { Shift } from "../../models/Shift";
import { Motorcycle } from "../../models/Motorcycle";
import { Driver } from "../../models/Driver";
import { Eye, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { motorcycleService } from "../../services/motorcycleServices";

const ListShift = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const shiftsData = await shiftService.getShifts();
      const motorcyclesData = await motorcycleService.getMotorcycles();
      const driversData = await driverService.getDrivers();

      setShifts(shiftsData);
      setMotorcycles(motorcyclesData);
      setDrivers(driversData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreate = () => navigate("/shift/create");
  const handleView = (id: number) => navigate("/shift/view/" + id);
  const handleEdit = (id: number) => navigate("/shift/update/" + id);
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const success = await shiftService.deleteShift(id);
          if (success) {
            Swal.fire({
              title: "Eliminado",
              text: "Se ha eliminado correctamente el turno",
              icon: "success",
              timer: 3000,
            });
            fetchData();
          } else {
            Swal.fire({
              title: "Error",
              text: "Existe un problema al momento de eliminar el turno",
              icon: "error",
              timer: 3000,
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el turno",
            icon: "error",
            timer: 3000,
          });
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke px-6.5 py-4">
            <h3 className="font-medium text-black">Listado de Turnos</h3>
            <button onClick={handleCreate} className="text-green-600 ml-4">
              Crear
            </button>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Moto</th>
                    <th scope="col" className="px-6 py-3">Conductor</th>
                    <th scope="col" className="px-6 py-3">Inicio</th>
                    <th scope="col" className="px-6 py-3">Fin</th>
                    <th scope="col" className="px-6 py-3">Estado</th>
                    <th scope="col" className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.map((shift) => (
                    <tr key={shift.id} className="odd:bg-white even:bg-gray-50 border-b">
                      <td className="px-6 py-4">{shift.id}</td>
                      <td className="px-6 py-4">
                        {motorcycles.find((m) => m.id === shift.motorcycle_id)?.license_plate || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {drivers.find((d) => d.id === shift.driver_id)?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(shift.start_time).toLocaleString() || "Fecha inválida"}
                      </td>
                      <td className="px-6 py-4">
                        {shift.end_time ? new Date(shift.end_time).toLocaleString() : "Sin fin"}
                      </td>
                      <td className="px-6 py-4">{shift.status}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button onClick={() => handleView(shift.id || 0)} className="text-blue-600">
                          <Eye size={20} />
                        </button>
                        <button onClick={() => handleEdit(shift.id || 0)} className="text-yellow-600">
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => shift.id && handleDelete(shift.id)}
                          className="text-red-600"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListShift;