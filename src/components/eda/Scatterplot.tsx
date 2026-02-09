import { useMemo, useState } from "react";
import type { EdaResponse } from "../../types/eda";
import GlassCard from "../common/GlassCard";

type Props = { eda: EdaResponse };

export default function ScatterPlot({ eda }: Props) {
  const nums = eda.columns.numeric;
  const [x, setX] = useState(nums[0] ?? "");
  const [y, setY] = useState(nums[1] ?? "");

  const points = useMemo(() => {
    if (!x || !y) return [];
    const rows = [...eda.head, ...eda.tail];
    return rows
      .map(r => ({ x: Number(r[x]), y: Number(r[y]) }))
      .filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));
  }, [x, y, eda]);

  if (nums.length < 2) return null;

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return (
    <GlassCard>
      <h2>Scatter Plot</h2>

      {/* selectors */}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <select value={x} onChange={e => setX(e.target.value)}>
          {nums.map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <select value={y} onChange={e => setY(e.target.value)}>
          {nums.map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="chart-wrapper" style={{ marginTop: 16 }}>
        <div className="scatter-wrapper">
          {points.map((p, i) => {
            const left = ((p.x - minX) / (maxX - minX || 1)) * 100;
            const top = 100 - ((p.y - minY) / (maxY - minY || 1)) * 100;

            return (
              <div
                key={i}
                className="scatter-point"
                data-tooltip={`${x}: ${p.x.toFixed(2)}, ${y}: ${p.y.toFixed(2)}`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`
                }}
              />
            );
          })}

          {/* axis labels */}
          <div className="scatter-axis-x">{x}</div>
          <div className="scatter-axis-y">{y}</div>
        </div>
      </div>
    </GlassCard>
  );
}
