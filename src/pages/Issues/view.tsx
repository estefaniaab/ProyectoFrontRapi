import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { issueService } from "../../services/issueService";
import Breadcrumb from "../../components/Breadcrumb";

import IssueFormValidator from "../../components/Issue/IssueFormValidator";
import { Issue } from "../../models/Issues";
import IssueContainerWithHeader from "../../components/Issue/IssueContainerWhitHeader";

const ViewIssue: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      if (!id) return;
      const issueData = await issueService.getIssueById(parseInt(id));
      setIssue(issueData);
    };
    fetchIssue();
  }, [id]);

  if (!issue) {
    return <div className="p-4 text-gray-600">Cargando...</div>;
  }

  return (
    <IssueContainerWithHeader motorcycleId={issue.motorcycle_id}>
      <Breadcrumb pageName="Ver Avería" />
      <IssueFormValidator
        mode={3}
        readOnly={true}
        initialData={issue}
        motorcycleId={issue.motorcycle_id}
      />
    </IssueContainerWithHeader>
  );
};

export default ViewIssue;