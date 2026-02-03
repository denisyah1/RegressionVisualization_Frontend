export interface CsvPreviewResponse {
  filename: string;
  total_rows: number;
  total_columns: number;
  columns: string[];
  numeric_columns: string[];
  null_summary: Record<string, number>;
  preview: Record<string, any>[];
}
