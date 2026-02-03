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
  const [col, setCol] = useState<string | null>(eda.columns.numeric[0] ?? null);

  const values = useMemo(() => {
    if (!col) return [];
    // ambil dari head+tail sebagai sampel ringan
    const rows = [...eda.head, ...eda.tail];
    return rows.map(r => Number(r[col])).filter(v => Number.isFinite(v));
  }, [col, eda]);

  const bins = useMemo(() => (values.length ? buildBins(values) : null), [values]);

  if (!eda.columns.numeric.length) return null;

  return (
    <GlassCard>
      <h2>Histogram</h2>

      <div style={{ marginTop: 8 }}>
        <select value={col ?? ""} onChange={e => setCol(e.target.value)}>
          {eda.columns.numeric.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {!bins ? (
        <p className="text-muted" style={{ marginTop: 12 }}>Not enough data.</p>
      ) : (
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 160, marginTop: 16 }}>
          {bins.counts.map((c, i) => (
            <div
              key={i}
              title={`bin ${i + 1}: ${c}`}
              style={{
                flex: 1,
                height: `${(c / Math.max(...bins.counts)) * 100}%`,
                background: "rgba(125, 211, 252, 0.6)",
                borderRadius: 6
              }}
            />
          ))}
        </div>
      )}
    </GlassCard>
  );
}
