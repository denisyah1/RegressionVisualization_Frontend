import { useState } from "react";
import type { EdaResponse } from "../../types/eda";
import GlassCard from "../common/GlassCard";

export default function HeadTailTable({ eda }: { eda: EdaResponse }) {
  const [mode, setMode] = useState<"head" | "tail">("head");
  const rows = mode === "head" ? eda.head : eda.tail;

  return (
    <GlassCard>
      <h2>Data Preview</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setMode("head")}>Head</button>
        <button onClick={() => setMode("tail")} style={{ marginLeft: 8 }}>
          Tail
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              {Object.keys(rows[0] || {}).map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((v, j) => (
                  <td key={j}>{String(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
