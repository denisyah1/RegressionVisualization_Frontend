import { useEffect, useState } from "react";
import { getRegressionPlot } from "../../api/regression.plot.api";
import type { RegressionPlotResponse } from "../../types/plot";
import GlassCard from "../common/GlassCard";

type Point = { x: number; y: number };

function buildPoints(actual: number[], pred: number[]): Point[] {
  return actual.map((x, i) => ({ x, y: pred[i] }));
}

export default function RegressionPlot() {
  const [plot, setPlot] = useState<RegressionPlotResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRegressionPlot()
      .then(setPlot)
      .catch(() => setError("Plot not available yet"));
  }, []);

  if (error) {
    return (
      <GlassCard>
        <h3>Regression Plot</h3>
        <p className="text-muted">{error}</p>
      </GlassCard>
    );
  }

  if (!plot) {
    return (
      <GlassCard>
        <h3>Regression Plot</h3>
        <p className="text-muted">Loading plot…</p>
      </GlassCard>
    );
  }

  const train = buildPoints(plot.train.y_actual, plot.train.y_pred);
  const test = buildPoints(plot.test.y_actual, plot.test.y_pred);
  const all = [...train, ...test];

  const min = Math.min(...all.map(p => Math.min(p.x, p.y)));
  const max = Math.max(...all.map(p => Math.max(p.x, p.y)));
  const scale = (v: number) => ((v - min) / (max - min || 1)) * 100;

  return (
    <GlassCard>
      <h2>Actual vs Predicted</h2>

      <div style={{ position: "relative", height: 300, marginTop: 16 }}>
        {/* perfect fit line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.15)",
            transform: "rotate(-45deg)",
            transformOrigin: "center"
          }}
        />

        {/* train points */}
        {train.map((p, i) => (
          <div
            key={`train-${i}`}
            title={`Train\nActual: ${p.x}\nPred: ${p.y}`}
            style={{
              position: "absolute",
              left: `${scale(p.x)}%`,
              top: `${100 - scale(p.y)}%`,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(125,211,252,0.7)"
            }}
          />
        ))}

        {/* test points */}
        {test.map((p, i) => (
          <div
            key={`test-${i}`}
            title={`Test\nActual: ${p.x}\nPred: ${p.y}`}
            style={{
              position: "absolute",
              left: `${scale(p.x)}%`,
              top: `${100 - scale(p.y)}%`,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,90,90,0.7)"
            }}
          />
        ))}
      </div>

      <div className="text-muted" style={{ marginTop: 12 }}>
        <span style={{ color: "#7dd3fc" }}>●</span> Train &nbsp;
        <span style={{ color: "#ff5c7a" }}>●</span> Test
      </div>
    </GlassCard>
  );
}
