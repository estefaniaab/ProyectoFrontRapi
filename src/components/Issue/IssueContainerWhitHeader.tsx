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
            <div className="mb-6 p-4 bg-gray-100 rounded-md text-center ">
                <h2 className="text-2xl font-bold text-gray-800">
                    {`Moto ${motorcycle?.brand}: ${motorcycle?.license_plate}`}
                </h2>
                <p className="text-lg text-gray-600">
                    Modelo: {motorcycle?.year}
                </p>
            </div>

            )}
            {children}
        </div>
        );


};

export default IssueContainerWithHeader;