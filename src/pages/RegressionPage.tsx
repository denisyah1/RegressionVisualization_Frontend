import { useState } from "react";
import { runRegression } from "../api/regression.api";
import GlassCard from "../components/common/GlassCard";
import type { EdaResponse } from "../types/eda";
import type { RegressionResponse } from "../types/regression";

import FeatureSelector from "../components/regression/FeatureSelector";
import NullStrategySelector from "../components/regression/NullStrategySelector";
import RegressionResult from "../components/regression/RegressionResult";
import TargetSelector from "../components/regression/TargetSelector";

export default function RegressionPage({
  eda,
  file
}: {
  eda: EdaResponse;
  file: File;
}) {
  const [target, setTarget] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [nullStrategy, setNullStrategy] = useState<"drop" | "mean">("drop");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RegressionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canRun =
    target &&
    features.length > 0 &&
    !features.includes(target);

  const handleRun = async () => {
    if (!canRun) return;

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

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "48px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 32
      }}
    >
      <GlassCard>
        <h1>Regression Setup</h1>
        <p className="text-secondary">
          Configure your regression model based on EDA insights.
        </p>
      </GlassCard>

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
          {loading ? "Running Regression…" : "Run Regression"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </GlassCard>

      {result && <RegressionResult result={result} />}
    </div>
  );
}
