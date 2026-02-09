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
          <RegressionPlot />
          <DownloadModelCard filename={result.saved_model_filename} />
        </>
      )}
    </div>
  );
}
