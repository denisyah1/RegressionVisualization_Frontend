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
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);

  return (
    <GlassCard>
      <h2>Scatter Plot</h2>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <select value={x} onChange={e => setX(e.target.value)}>
          {nums.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select value={y} onChange={e => setY(e.target.value)}>
          {nums.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div style={{ position: "relative", height: 240, marginTop: 16 }}>
        {points.map((p, i) => {
          const left = ((p.x - minX) / (maxX - minX || 1)) * 100;
          const top = 100 - ((p.y - minY) / (maxY - minY || 1)) * 100;
          return (
            <div
              key={i}
              title={`(${p.x}, ${p.y})`}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(255, 90, 90, 0.6)"
              }}
            />
          );
        })}
      </div>
    </GlassCard>
  );
}
