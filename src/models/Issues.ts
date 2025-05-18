export interface Issue {
    id?: number;
    motorcycle_id: number;
    description: string;
    created_at?: Date| null;
    date_reported?: Date | null;
    issue_type: string; // Ejemplo: "OPEN", "IN_PROGRESS", "RESOLVED"
}