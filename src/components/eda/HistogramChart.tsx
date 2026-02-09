import { useMemo, useState } from "react";
import type { EdaResponse } from "../../types/eda";
import GlassCard from "../common/GlassCard";

type Props = { eda: EdaResponse };

function buildBins(values: number[], bins = 12) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = (max - min) / bins || 1;
  const counts = Array(bins).fill(0);

  values.forEach(v => {
    const idx = Math.min(bins - 1, Math.floor((v - min) / step));
    counts[idx]++;
  });

  return { min, max, step, counts };
}

export default function HistogramChart({ eda }: Props) {
  const [col, setCol] = useState<string | null>(
    eda.columns.numeric[0] ?? null
  );

  const values = useMemo(() => {
    if (!col) return [];
    const rows = [...eda.head, ...eda.tail];
    return rows.map(r => Number(r[col])).filter(Number.isFinite);
  }, [col, eda]);

  const bins = useMemo(
    () => (values.length ? buildBins(values) : null),
    [values]
  );

  if (!eda.columns.numeric.length) return null;

  return (
    <GlassCard>
      <h2>Histogram</h2>

      {/* selector */}
      <div style={{ marginTop: 8 }}>
        <select value={col ?? ""} onChange={e => setCol(e.target.value)}>
          {eda.columns.numeric.map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {!bins ? (
        <p className="text-muted" style={{ marginTop: 12 }}>
          Not enough data.
        </p>
      ) : (
        <div className="chart-wrapper">
          <div className="histogram-bars">
            {bins.counts.map((count, i) => {
              const maxCount = Math.max(...bins.counts);
              const height = (count / maxCount) * 100;

              const rangeStart = (bins.min + i * bins.step).toFixed(2);
              const rangeEnd = (bins.min + (i + 1) * bins.step).toFixed(2);

              return (
                <div
                  key={i}
                  className="histogram-bar"
                  data-tooltip={`${rangeStart} – ${rangeEnd}: ${count}`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>
      )}
    </GlassCard>
  );
}
