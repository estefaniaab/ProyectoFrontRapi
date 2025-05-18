import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Issue } from "../../models/Issues";


interface IssueFormProps {
    mode: number;
    handleCreate?: (values: Issue) => void;
    handleUpdate?: (values: Issue) => void;
    readOnly?: boolean;
    issue?: Issue | null;
    motorcycleId?: number;
}

const IssueFormValidator: React.FC<IssueFormProps> = ({ mode, handleCreate, handleUpdate, readOnly, issue, motorcycleId }) => {
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

    const effectiveMotorcycleId = motorcycleId || issue?.motorcycle_id;

    return (
        <Formik
            initialValues={
                issue
                    ? {
                          motorcycle_id: issue.motorcycle_id,
                          description: issue.description,
                          reported_at: new Date(issue.reported_at).toISOString().slice(0, 16),
                          resolved_at: issue.resolved_at ? new Date(issue.resolved_at).toISOString().slice(0, 16) : "",
                          status: issue.status,
                      }
                    : {
                          motorcycle_id: motorcycleId || 0,
                          description: "",
                          reported_at: new Date().toISOString().slice(0, 16),
                          resolved_at: "",
                          status: "OPEN",
                      }
            }
            validationSchema={Yup.object({
                motorcycle_id: Yup.number()
                    .required("El ID de la motocicleta es obligatorio")
                    .positive("Debe ser un número positivo")
                    .integer("Debe ser un número entero"),
                description: Yup.string().required("La descripción es obligatoria"),
                reported_at: Yup.date().required("La fecha de reporte es obligatoria"),
                resolved_at: Yup.date().nullable(),
                status: Yup.string()
                    .oneOf(["OPEN", "IN_PROGRESS", "RESOLVED"], "El estado debe ser Abierto, En Progreso o Resuelto")
                    .required("El estado es obligatorio"),
            })}
            onSubmit={(values) => {
                const formattedValues: Issue = {
                    id: issue?.id,
                    motorcycle_id: values.motorcycle_id,
                    description: values.description,
                    reported_at: new Date(values.reported_at),
                    resolved_at: values.resolved_at ? new Date(values.resolved_at) : null,
                    status: values.status,
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
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
                    <div>
                        <label htmlFor="reported_at" className="block text-lg font-medium text-gray-700">
                            Fecha de Reporte
                        </label>
                        <Field
                            type="datetime-local"
                            name="reported_at"
                            className="w-full border rounded-md p-2"
                            disabled={readOnly}
                        />
                        <ErrorMessage name="reported_at" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="resolved_at" className="block text-lg font-medium text-gray-700">
                            Fecha de Resolución (Opcional)
                        </label>
                        <Field
                            type="datetime-local"
                            name="resolved_at"
                            className="w-full border rounded-md p-2"
                            disabled={readOnly}
                        />
                        <ErrorMessage name="resolved_at" component="p" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">
                            Estado
                        </label>
                        <Field as="select" name="status" className="w-full border rounded-md p-2" disabled={readOnly}>
                            <option value="OPEN">Abierto</option>
                            <option value="IN_PROGRESS">En Progreso</option>
                            <option value="RESOLVED">Resuelto</option>
                        </Field>
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>
                    {!readOnly && (
                        <button
                            type="submit"
                            className={`py-2 px-4 text-black rounded-md ${
                                mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {mode === 1 ? "Crear" : "Actualizar"}
                        </button>
                    )}
                    <button
                        type="button"
                        className="py-2 px-6 text-black rounded-md bg-gray-500 hover:bg-gray-600"
                        onClick={() => navigate(`/issues/list/${effectiveMotorcycleId}`)}
                    >
                        Volver
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default IssueFormValidator;