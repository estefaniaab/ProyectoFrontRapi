import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { issueService } from "../../services/issueService";
import Breadcrumb from "../../components/Breadcrumb";

import IssueFormValidator from "../../components/Issue/IssueFormValidator";
import { Issue } from "../../models/Issues";
import IssueContainerWithHeader from "../../components/Issue/IssueContainerWhitHeader";

const ViewIssue: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [issue, setIssue] = useState<Issue | null>(null);

    useEffect(() => {
        const fetchIssue = async () => {
            if (!id) return;
            const issueId = parseInt(id);
            if (isNaN(issueId) || issueId <= 0) return;
            const issueData = await issueService.getIssueById(issueId);
            setIssue(issueData);
        };
        fetchIssue();
    }, [id]);

    if (!issue) {
        return <div className="p-4 text-gray-600">Cargando...</div>;
    }

    return (
        <IssueContainerWithHeader motorcycleId={issue?.motorcycle_id}>
            <Breadcrumb pageName="Ver Avería" />
            <IssueFormValidator mode={3} issue={issue} readOnly={true} />
        </IssueContainerWithHeader>
    );
};

export default ViewIssue;