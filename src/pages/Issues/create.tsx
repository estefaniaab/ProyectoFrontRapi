import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { issueService } from "../../services/issueService";
import Breadcrumb from "../../components/Breadcrumb";

import IssueFormValidator from "../../components/Issue/IssueFormValidator";
import { Issue } from "../../models/Issues";
import IssueContainerWithHeader from "../../components/Issue/IssueContainerWhitHeader";

const CreateIssue: React.FC = () => {
    const navigate = useNavigate();
    const { motorcycle_id } = useParams<{ motorcycle_id: string }>();
    const motorcycleId = parseInt(motorcycle_id || "0");

    const handleCreateIssue = async (issue: Issue) => {
        try {
            const createdIssue = await issueService.createIssue(issue);
            if (createdIssue) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente la avería",
                    icon: "success",
                    timer: 3000,
                });
                navigate(`/issues/list/${issue.motorcycle_id}`);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al crear la avería",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear la avería",
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <IssueContainerWithHeader motorcycleId={motorcycleId}>
            <Breadcrumb pageName="Crear Avería" />
            <IssueFormValidator
                handleCreate={handleCreateIssue}
                mode={1}
                readOnly={false}
                motorcycleId={motorcycleId}
            />
        </IssueContainerWithHeader>
    );
};

export default CreateIssue;