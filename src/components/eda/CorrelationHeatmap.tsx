import type { EdaResponse } from "../../types/eda";
import GlassCard from "../common/GlassCard";

type Props = {
  eda: EdaResponse;
};

function getColor(value: number | null) {
  if (value === null) return "rgba(255,255,255,0.06)";

  const v = Math.max(-1, Math.min(1, value));

  if (v < 0) {
    return `rgba(138, 92, 255, ${0.25 + Math.abs(v) * 0.6})`;
  }
  return `rgba(0, 255, 209, ${0.25 + v * 0.6})`;
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

      <div className="heatmap-wrapper">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `120px repeat(${columns.length}, 1fr)`,
            gap: 4,
            overflowX: "auto"
          }}
        >
          {/* empty corner */}
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
              {/* row label */}
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

              {columns.map(col => {
                const value = matrix[row]?.[col] ?? null;

                return (
                  <div
                    key={`${row}-${col}`}
                    className="heatmap-cell"
                    data-tooltip={
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
                      borderRadius: 6,
                      border: "1px solid rgba(255,255,255,0.25)"
                    }}
                  >
                    {value !== null ? value.toFixed(2) : "–"}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
