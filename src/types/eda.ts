export interface NumericSummary {
  mean: number | null;
  std: number | null;
  min: number | null;
  max: number | null;
  null_count: number;
}

export interface CategoricalSummary {
  unique_count: number;
  null_count: number;
}

export interface EdaResponse {
  head: Record<string, any>[];
  tail: Record<string, any>[];

  columns: {
    numeric: string[];
    categorical: string[];
  };

  summary_statistics: Record<string, NumericSummary>;

  categorical_summary: Record<string, CategoricalSummary>;

  correlation_matrix: Record<
    string,
    Record<string, number | null>
  >;
}
