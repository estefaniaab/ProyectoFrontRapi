export interface Issue {
    id?: number;
    motorcycle_id: number;
    description: string;
    reported_at: Date;
    resolved_at?: Date | null;
    status: string; // Ejemplo: "OPEN", "IN_PROGRESS", "RESOLVED"
}