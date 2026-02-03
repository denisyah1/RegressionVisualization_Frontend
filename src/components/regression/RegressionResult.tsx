import type { RegressionResponse } from "../../types/regression";
import GlassCard from "../common/GlassCard";

export default function RegressionResult({
  result
}: {
  result: RegressionResponse;
}) {
  return (
    <GlassCard>
      <h2>Best Model: {result.best_model}</h2>

      <p className="text-muted">
        Train rows: {result.data_info.train_rows} ·
        Test rows: {result.data_info.test_rows}
      </p>

      <h3>Model Comparison</h3>
      {Object.entries(result.model_comparison).map(([name, m]) => (
        <div key={name}>
          <strong>{name}</strong>
          <div className="text-muted">
            R² (test): {m.test_r2 ?? "N/A"} · MSE: {m.test_mse ?? "N/A"}
          </div>
        </div>
      ))}
    </GlassCard>
  );
}
