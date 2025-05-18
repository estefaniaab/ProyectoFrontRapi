import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { issueService } from "../../services/issueService";
import Breadcrumb from "../../components/Breadcrumb";

import IssueFormValidator from "../../components/Issue/IssueFormValidator";
import { Issue } from "../../models/Issues";
import IssueContainerWithHeader from "../../components/Issue/IssueContainerWhitHeader";

const UpdateIssue: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [issue, setIssue] = useState<Issue | null>(null);

    useEffect(() => {
        const fetchIssue = async () => {
            if (!id) return;
            const issueId = parseInt(id);
            if (isNaN(issueId) || issueId <= 0) return;
            const issueData = await issueService.getIssueById(issueId);
            if (issueData) {
                setIssue(issueData);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Avería no encontrada",
                    icon: "error",
                    timer: 3000,
                });
                navigate("/issues/list");
            }
        };
        fetchIssue();
    }, [id, navigate]);

    const handleUpdateIssue = async (theIssue: Issue) => {
        try {
            if (!theIssue.id || theIssue.id <= 0) {
                Swal.fire({
                    title: "Error",
                    text: "ID de avería inválido",
                    icon: "error",
                    timer: 3000,
                });
                return;
            }
            const updatedIssue = await issueService.updateIssue(theIssue.id, theIssue);
            if (updatedIssue) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente la avería",
                    icon: "success",
                    timer: 3000,
                });
                navigate(`/issues/list/${theIssue.motorcycle_id}`);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al actualizar la avería",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar la avería",
                icon: "error",
                timer: 3000,
            });
        }
    };

    if (!issue) {
        return <div>Cargando...</div>;
    }

    return (
        <IssueContainerWithHeader motorcycleId={issue?.motorcycle_id}>
            <Breadcrumb pageName="Actualizar Avería" />
            <IssueFormValidator
                handleUpdate={handleUpdateIssue}
                mode={2}
                readOnly={false}
                issue={issue}
            />
        </IssueContainerWithHeader>
    );
};

export default UpdateIssue;