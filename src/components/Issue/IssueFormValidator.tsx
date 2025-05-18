import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { issueService } from "../../services/issueService";
import { Issue } from "../../models/Issues";

interface IssueFormValidatorProps {
  mode: number; // 1 (crear), 2 (actualizar), 3 (visualizar)
  handleCreate?: (values: Issue) => void;
  handleUpdate?: (values: Partial<Issue>) => void;
  readOnly?: boolean;
  motorcycleId?: number;
  initialData?: Issue;
}

const IssueFormValidator: React.FC<IssueFormValidatorProps> = ({
  mode,
  handleCreate,
  handleUpdate,
  readOnly,
  motorcycleId,
  initialData,
}) => {
  const navigate = useNavigate();

  const handleSubmit = (formattedValues: Issue) => {
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error("No function provided for the current mode");
    }
  };
  const effectiveMotorcycleId = motorcycleId || initialData?.motorcycle_id;
  return (
    <Formik
      initialValues={{
        id: initialData?.id ?? undefined,
        motorcycle_id: initialData?.motorcycle_id ?? motorcycleId ?? 0,
        description: initialData?.description ?? "",
        
        // ✔️ Verificamos si `created_at` es un string y lo convertimos a `Date`
        created_at: initialData?.created_at 
          ? initialData.created_at instanceof Date 
            ? initialData.created_at.toISOString().slice(0, 16)
            : new Date(initialData.created_at).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16),

        // ✔️ Manejamos `date_reported` igual para evitar problemas
        date_reported: initialData?.date_reported 
          ? initialData.date_reported instanceof Date 
            ? initialData.date_reported.toISOString().slice(0, 16)
            : new Date(initialData.date_reported).toISOString().slice(0, 16)
          : "",

        issue_type: initialData?.issue_type ?? "OPEN",
      }}
      
      validationSchema={Yup.object({
        motorcycle_id: Yup.number()
          .required("El ID de la motocicleta es obligatorio")
          .positive("Debe ser un número positivo")
          .integer("Debe ser un número entero"),
        description: Yup.string().required("La descripción es obligatoria"),
        created_at: Yup.date().required("La fecha de creación es obligatoria"),
        date_reported: Yup.date()
          .nullable()
          .transform((value, originalValue) => (originalValue === "" ? null : value)),
        issue_type: Yup.string().required("El tipo es obligatorio"),
      })}
      
      onSubmit={(values) => {
        const formattedValues: Issue = {
          id: values.id,
          motorcycle_id: values.motorcycle_id,
          description: values.description,

          // ✔️ Convertimos `created_at` y `date_reported` a `Date` al enviar
          created_at: new Date(values.created_at),
          date_reported: values.date_reported ? new Date(values.date_reported) : null,

          issue_type: values.issue_type,
        };
        handleSubmit(formattedValues);
      }}
    >
      {({ handleSubmit, values }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          {/* Motocicleta ID */}
          <div>
            <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">
              Motocicleta ID
            </label>
            <Field
              type="number"
              name="motorcycle_id"
              className="w-full border rounded-md p-2"
              disabled={readOnly}
            />
            <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Descripción
            </label>
            <Field
              type="text"
              name="description"
              className="w-full border rounded-md p-2"
              disabled={readOnly}
            />
            <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Fecha de Creación */}
          <div>
            <label htmlFor="created_at" className="block text-lg font-medium text-gray-700">
              Fecha de Creación
            </label>
            <Field
              type="datetime-local"
              name="created_at"
              className="w-full border rounded-md p-2"
              disabled={readOnly}
            />
            <ErrorMessage name="created_at" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Fecha de Reporte */}
          <div>
            <label htmlFor="date_reported" className="block text-lg font-medium text-gray-700">
              Fecha de Reporte
            </label>
            <Field
              type="datetime-local"
              name="date_reported"
              value={values.date_reported || ""}
              className="w-full border rounded-md p-2"
              disabled={readOnly || mode === 1}
            />
            <ErrorMessage name="date_reported" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Tipo */}
          <div>
            <label htmlFor="issue_type" className="block text-lg font-medium text-gray-700">
              Tipo
            </label>
            <Field
              as="select"
              name="issue_type"
              className="w-full border rounded-md p-2"
              disabled={readOnly}
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
            </Field>
            <ErrorMessage name="issue_type" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Botón de enviar */}
          {!readOnly && (
            <button
              type="submit"
              className={`py-2 px-4 text-black rounded-md ${
                mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {mode === 1 ? "Crear" : mode === 2 ? "Actualizar" : ""}
            </button>
          )}

          {/* Botón de volver */}
          <button
            type="button"
            className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
            onClick={() => {
              navigate(effectiveMotorcycleId? `/issues/list/${effectiveMotorcycleId}` : "/issues/list");
            }}
          >
            Volver
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default IssueFormValidator;
