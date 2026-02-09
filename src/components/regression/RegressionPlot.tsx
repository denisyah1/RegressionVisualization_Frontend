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
        <h2>Actual vs Predicted</h2>
        <p className="text-muted">{error}</p>
      </GlassCard>
    );
  }

  if (!plot) {
    return (
      <GlassCard>
        <h2>Actual vs Predicted</h2>
        <p className="text-muted">Loading plot…</p>
      </GlassCard>
    );
  }

  const train = buildPoints(plot.train.y_actual, plot.train.y_pred);
  const test = buildPoints(plot.test.y_actual, plot.test.y_pred);
  const all = [...train, ...test];

  const min = Math.min(...all.map(p => Math.min(p.x, p.y)));
  const max = Math.max(...all.map(p => Math.max(p.x, p.y)));

  const scale = (v: number) =>
    ((v - min) / (max - min || 1)) * 100;

  return (
    <GlassCard>
      <h2>Actual vs Predicted</h2>

      <div className="chart-wrapper" style={{ marginTop: 16 }}>
        <div className="regression-wrapper">
          {/* perfect fit line */}
          <div className="regression-diagonal" />

          {/* train */}
          {train.map((p, i) => (
            <div
              key={`train-${i}`}
              className="reg-point train"
              data-tooltip={`Train | Actual: ${p.x.toFixed(2)} • Pred: ${p.y.toFixed(2)}`}
              style={{
                left: `${scale(p.x)}%`,
                top: `${100 - scale(p.y)}%`
              }}
            />
          ))}

          {/* test */}
          {test.map((p, i) => (
            <div
              key={`test-${i}`}
              className="reg-point test"
              data-tooltip={`Test | Actual: ${p.x.toFixed(2)} • Pred: ${p.y.toFixed(2)}`}
              style={{
                left: `${scale(p.x)}%`,
                top: `${100 - scale(p.y)}%`
              }}
            />
          ))}

          {/* axis */}
          <div className="reg-axis-x">Actual</div>
          <div className="reg-axis-y">Predicted</div>
        </div>
      </div>

      <div className="text-muted" style={{ marginTop: 12 }}>
        <span style={{ color: "#7dd3fc" }}>●</span> Train &nbsp;
        <span style={{ color: "#ff5c7a" }}>●</span> Test &nbsp;
        <span style={{ opacity: 0.6 }}>— Perfect Fit</span>
      </div>
    </GlassCard>
  );
}
