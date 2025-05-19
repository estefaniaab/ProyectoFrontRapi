import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Motorcycle } from "../../models/Motorcycle";
import { issueService } from "../../services/issueService";
import { motorcycleService } from "../../services/motorcycleServices";
import { Issue } from "../../models/Issues";

interface PhotoContainerWithHeaderProps {
    children: React.ReactNode;
    issueId?: number;
}

const PhotoContainerWithHeader: React.FC<PhotoContainerWithHeaderProps> = ({ children, issueId }) => {
    const { issue_id } = useParams<{ issue_id: string }>();
    const [issue, setIssue] = useState<Issue | null>(null);
    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

    useEffect(() => {
        const fetchIssueAndMotorcycle = async () => {
            const id = issueId || parseInt(issue_id || "0");
            if (id <= 0) return;
            const issueData = await issueService.getIssueById(id);
            if (issueData) {
                setIssue(issueData);
                const motorcycleData = await motorcycleService.getMotorcycleById(issueData.motorcycle_id);
                setMotorcycle(motorcycleData);
            }
        };
        fetchIssueAndMotorcycle();
    }, [issueId, issue_id]);

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

export default PhotoContainerWithHeader;