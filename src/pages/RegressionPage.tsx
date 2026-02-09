import { useNavigate } from "react-router-dom";
import GlassCard from "../components/common/GlassCard";

import RecommendationCard from "../components/regression/RecommendationCard";
import TargetSelector from "../components/regression/TargetSelector";
import FeatureSelector from "../components/regression/FeatureSelector";
import NullStrategySelector from "../components/regression/NullStrategySelector";
import RegressionResult from "../components/regression/RegressionResult";
import RegressionPlot from "../components/regression/RegressionPlot";
import DownloadModelCard from "../components/regression/DownloadModelCard";

import { runRegression } from "../api/regression.api";
import { useDatasetStore } from "../store/useDatasetStore";
import { useRegressionStore } from "../store/useRegressionStore";

export default function RegressionPage() {
  const navigate = useNavigate();

  const { file, eda } = useDatasetStore();
  const {
    target,
    features,
    nullStrategy,
    result,
    loading,
    error,
    setTarget,
    setFeatures,
    setNullStrategy,
    setResult,
    setLoading,
    setError
  } = useRegressionStore();

  const canRun =
    !!file &&
    !!eda &&
    target.length > 0 &&
    features.length > 0 &&
    !features.includes(target);

  const handleRun = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const res = await runRegression({
        file,
        target,
        features,
        nullStrategy
      });
      setResult(res);
    } catch {
      setError("Regression failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    const container = document.getElementById("regression-pdf");
    if (!container) return;

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Regression Report</title>
          <style>
            * { box-sizing: border-box; }
            body {
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              margin: 24px;
              color: #0f172a;
              background: #ffffff;
            }
            h1, h2, h3 { margin: 0 0 8px 0; }
            .pdf-card {
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 16px;
              margin-bottom: 16px;
            }
            .chart-wrapper {
              position: relative;
              background: #0b1220;
              border: 2px solid #94a3b8;
              border-radius: 16px;
              padding: 16px;
            }
            .regression-wrapper {
              position: relative;
              height: 320px;
              overflow: hidden;
            }
            .regression-diagonal {
              position: absolute;
              inset: 0;
              pointer-events: none;
            }
            .regression-diagonal::after {
              content: "";
              position: absolute;
              width: 140%;
              height: 2px;
              background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.7), rgba(255,255,255,0.2));
              top: 50%;
              left: -20%;
              transform: rotate(-45deg);
            }
            .reg-point {
              position: absolute;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              transform: translate(-50%, -50%);
              border: 1px solid rgba(255,255,255,0.65);
            }
            .reg-point.train { background: rgba(125, 211, 252, 0.95); }
            .reg-point.test { background: rgba(255, 90, 90, 0.95); }
            .reg-point::after { display: none; }
            .reg-axis-x, .reg-axis-y {
              position: absolute;
              font-size: 11px;
              color: rgba(255,255,255,0.7);
            }
            .reg-axis-x { bottom: -18px; left: 50%; transform: translateX(-50%); }
            .reg-axis-y { top: 50%; left: -28px; transform: rotate(-90deg) translateX(-50%); transform-origin: left top; }
            .legend { margin-top: 10px; font-size: 12px; color: #334155; }
          </style>
        </head>
        <body>
          <h1>Regression Report</h1>
          ${container.innerHTML}
        </body>
      </html>
    `;

    const win = window.open("", "_blank", "width=1100,height=800");
    if (!win) return;
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 300);
  };

  return (
    <div className="page-container">
      {/* HEADER */}
      <GlassCard>
        <button onClick={() => navigate("/eda")}>← Back to EDA</button>
        <h1>Regression Setup</h1>
        <p className="text-secondary">
          Configure and run regression based on EDA insights.
        </p>
      </GlassCard>

      {/* CONFIG */}
      {eda && (
        <>
          {/* 🔥 AUTO RECOMMENDATION */}
          <RecommendationCard />

          {/* MANUAL SETUP */}
          <TargetSelector
            numericColumns={eda.columns.numeric}
            value={target}
            onChange={setTarget}
          />

          <FeatureSelector
            numericColumns={eda.columns.numeric}
            categoricalColumns={eda.columns.categorical}
            value={features}
            onChange={setFeatures}
          />

          <NullStrategySelector
            value={nullStrategy}
            onChange={setNullStrategy}
          />

          <GlassCard>
            <button disabled={!canRun || loading} onClick={handleRun}>
              {loading ? "Running regression…" : "Run Regression"}
            </button>
            {error && <p className="text-error">{error}</p>}
          </GlassCard>
        </>
      )}

      {/* RESULT */}
      {result && (
        <>
          <RegressionResult result={result} />
          <div id="regression-pdf">
            <div className="pdf-card">
              <h2>Best Model Summary</h2>
              <p>
                <strong>Best Model:</strong> {result.best_model}
              </p>
              {result.model_comparison[result.best_model] && (
                <p>
                  <strong>Test R²:</strong>{" "}
                  {result.model_comparison[result.best_model].test_r2 ?? "N/A"} &nbsp;|&nbsp;
                  <strong>Test MSE:</strong>{" "}
                  {result.model_comparison[result.best_model].test_mse ?? "N/A"}
                </p>
              )}
            </div>
            <RegressionPlot />
          </div>
          <DownloadModelCard filename={result.saved_model_filename} />
          <GlassCard>
            <button onClick={handleDownloadPdf}>Download PDF Report</button>
          </GlassCard>
        </>
      )}
    </div>
  );
}
