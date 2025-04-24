export interface Table {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
}

export interface Row {
  id: number;
  table_id: number;
  data: Record<string, any>;
  created_at: string;
  updated_at: string;
}
