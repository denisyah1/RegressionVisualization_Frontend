import type { EdaResponse } from "../../types/eda";
import GlassCard from "../common/GlassCard";

type Props = {
  eda: EdaResponse;
};

function getColor(value: number | null) {
  if (value === null) return "rgba(255,255,255,0.05)";

  // clamp
  const v = Math.max(-1, Math.min(1, value));

  // blue (-1) → gray (0) → red (1)
  if (v < 0) {
    const t = Math.abs(v);
    return `rgba(80, 140, 255, ${0.2 + t * 0.6})`;
  } else {
    return `rgba(255, 90, 90, ${0.2 + v * 0.6})`;
  }
}

export default function CorrelationHeatmap({ eda }: Props) {
  const matrix = eda.correlation_matrix;
  const columns = Object.keys(matrix);

  if (columns.length < 2) {
    return (
      <GlassCard>
        <h2>Correlation Matrix</h2>
        <p className="text-muted">
          Correlation requires at least two numeric columns.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <h2>Correlation Matrix</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `120px repeat(${columns.length}, 1fr)`,
          marginTop: 16,
          gap: 4,
          overflowX: "auto"
        }}
      >
        {/* top-left empty */}
        <div />

        {/* column headers */}
        {columns.map(col => (
          <div
            key={col}
            className="text-muted"
            style={{
              fontSize: 12,
              textAlign: "center",
              whiteSpace: "nowrap"
            }}
          >
            {col}
          </div>
        ))}

        {/* rows */}
        {columns.map(row => (
          <>
            {/* row header */}
            <div
              key={`${row}-label`}
              className="text-muted"
              style={{
                fontSize: 12,
                paddingRight: 8,
                whiteSpace: "nowrap"
              }}
            >
              {row}
            </div>

            {/* cells */}
            {columns.map(col => {
              const value = matrix[row]?.[col] ?? null;

              return (
                <div
                  key={`${row}-${col}`}
                  title={
                    value !== null
                      ? `${row} × ${col}: ${value.toFixed(3)}`
                      : "N/A"
                  }
                  style={{
                    height: 36,
                    background: getColor(value),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: "#fff",
                    borderRadius: 6
                  }}
                >
                  {value !== null ? value.toFixed(2) : "–"}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </GlassCard>
  );
}
