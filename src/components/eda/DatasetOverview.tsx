import type { EdaResponse } from "../../types/eda";
import GlassCard from "../common/GlassCard";

export default function DatasetOverview({ eda }: { eda: EdaResponse }) {
  return (
    <GlassCard>
      <h2>Dataset Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 16
        }}
      >
        <div>
          <strong>Numeric Columns</strong>
          <div>{eda.columns.numeric.length}</div>
        </div>

        <div>
          <strong>Categorical Columns</strong>
          <div>{eda.columns.categorical.length}</div>
        </div>
      </div>
    </GlassCard>
  );
}
