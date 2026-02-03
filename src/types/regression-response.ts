export interface ModelMetrics {
  train_r2?: number;
  test_r2?: number;
  test_mse?: number;
  error?: string;
}

export interface RegressionResponse {
  best_model: string;

  feature_engineering: {
    numeric_features: string[];
    categorical_features: string[];
  };

  model_comparison: Record<string, ModelMetrics>;

  best_model_metrics: {
    test_r2: number | null;
    test_mse: number;
  };
}
