export interface ModelMetric {
  train_r2?: number | null;
  test_r2?: number | null;
  test_mse?: number | null;
}

export interface RegressionResponse {
  best_model: string;
  model_comparison: Record<string, ModelMetric>;
  feature_engineering: {
    numeric_features: string[];
    categorical_features: string[];
  };
  data_info: {
    rows: number;
    train_rows: number;
    test_rows: number;
    null_strategy: string;
  };
  saved_model_filename: string;
}
