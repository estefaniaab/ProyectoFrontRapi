export interface Shift {
  id: number;
  driver_id: number;
  motorcycle_id: number;
  start_time: Date | string;
  end_time?: Date | string | null;
  status: string; // Por ejemplo, 'active', 'inactive'
}