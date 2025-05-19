import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { issueService } from "../../services/issueService";
import Breadcrumb from "../../components/Breadcrumb";

import IssueFormValidator from "../../components/Issue/IssueFormValidator";
import { Issue } from "../../models/Issues";
import IssueContainerWithHeader from "../../components/Issue/IssueContainerWhitHeader";

const UpdateIssue: React.FC = () => {
  const navigate = useNavigate();
  const { id, motorcycle_id } = useParams<{ id: string; motorcycle_id: string }>();
  const motorcycleId = motorcycle_id ? parseInt(motorcycle_id) : undefined;
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      if (!id) return;
      const issueData = await issueService.getIssueById(parseInt(id));
      setIssue(issueData);
    };
    fetchIssue();
  }, [id]);

  const handleUpdateIssue = async (issue: Partial<Issue>) => {
    try {
      const updatedIssue = await issueService.updateIssue(issue.id || 0, issue);
      if (updatedIssue) {
        Swal.fire({
          title: "Completado",
          text: "Se ha actualizado correctamente la avería",
          icon: "success",
          timer: 3000,
        });
                const effectiveMotorcycleId = updatedIssue.motorcycle_id || motorcycleId;
        navigate(
          effectiveMotorcycleId
            ? `/issues/list/${effectiveMotorcycleId}`
            : "/issues/list"
        );
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
    <IssueContainerWithHeader motorcycleId={motorcycleId}>
      <Breadcrumb pageName="Actualizar Avería" />
      <IssueFormValidator
        mode={2}
        handleUpdate={handleUpdateIssue}
        readOnly={false}
        motorcycleId={motorcycleId}
        initialData={issue}
      />
    </IssueContainerWithHeader>
  );
};

export default UpdateIssue;