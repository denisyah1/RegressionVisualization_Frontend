export type NullStrategy = "mean" | "drop";

export interface RegressionResponse {
  best_model: string;

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

  model_comparison: Record<
    string,
    {
      train_r2?: number;
      test_r2?: number;
      test_mse?: number;
      error?: string;
    }
  >;

  saved_model_filename: string;
}
