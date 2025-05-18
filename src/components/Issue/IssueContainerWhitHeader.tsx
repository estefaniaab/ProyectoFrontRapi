import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Motorcycle } from "../../models/Motorcycle";
import { motorcycleService } from "../../services/motorcycleServices";

interface IssueContainerWithHeaderProps {
    children: React.ReactNode;
    motorcycleId?: number;
}

const IssueContainerWithHeader: React.FC<IssueContainerWithHeaderProps> = ({ children, motorcycleId }) => {
    const { motorcycle_id } = useParams<{ motorcycle_id: string }>();
    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

    useEffect(() => {
        const fetchMotorcycle = async () => {
            const id = motorcycleId || parseInt(motorcycle_id || "0");
            if (id <= 0) return;
            const data = await motorcycleService.getMotorcycleById(id);
            setMotorcycle(data);
        };
        fetchMotorcycle();
    }, [motorcycleId, motorcycle_id]);

    return (
        <div className="p-6">
            {motorcycle && (
                <div className="mb-6 p-4 bg-gray-100 rounded-md shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">Información de la Motocicleta</h2>
                    <div className="mt-2 space-y-1">
                        <p className="text-gray-600">
                            <span className="font-medium">Placa:</span> {motorcycle.license_plate || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Modelo:</span> {motorcycle.year || "N/A"}
                        </p>
                    </div>
                </div>
            )}
            {children}
        </div>
    );
};

export default IssueContainerWithHeader;