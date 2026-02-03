import type { EdaResponse } from "../../types/eda";
import GlassCard from "../common/GlassCard";

export default function NumericSummary({ eda }: { eda: EdaResponse }) {
  return (
    <GlassCard>
      <h2>Numeric Summary</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 16
        }}
      >
        {Object.entries(eda.summary_statistics).map(([col, stat]) => (
          <div key={col} className="glass" style={{ padding: 16 }}>
            <strong>{col}</strong>
            <div className="text-muted">Mean: {stat.mean}</div>
            <div className="text-muted">Std: {stat.std}</div>
            <div className="text-muted">Min: {stat.min}</div>
            <div className="text-muted">Max: {stat.max}</div>
            <div className="text-muted">Nulls: {stat.null_count}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
