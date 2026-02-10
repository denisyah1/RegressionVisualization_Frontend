import { useNavigate } from "react-router-dom";
import GlassCard from "../components/common/GlassCard";
import DatasetOverview from "../components/eda/DatasetOverview";
import NumericSummary from "../components/eda/NumericSummary";
import CorrelationHeatmap from "../components/eda/CorrelationHeatmap";
import HistogramChart from "../components/eda/HistogramChart";
import ScatterPlot from "../components/eda/Scatterplot";
import HeadTailTable from "../components/eda/HeadTailTable";

import { runEda } from "../api/eda.api";
import { useDatasetStore } from "../store/useDatasetStore";

export default function EdaPage() {
  const navigate = useNavigate();

  const {
    eda,
    loading,
    error,
    setFile,
    setEda,
    setLoading,
    setError
  } = useDatasetStore();

  const handleUpload = async (f: File) => {
    setFile(f);
    setLoading(true);
    setError(null);

    try {
      const result = await runEda(f);
      setEda(result);
    } catch {
      setError("Failed to analyze CSV");
    } finally {
      setLoading(false);
    }
  };
  <h3 className="section-title">Correlation Matrix</h3>

  return (
    <div className="page-container">
      {/* HEADER */}
      <GlassCard>
        <h1>Exploratory Data Analysis</h1>
        <p className="text-secondary">
          Understand your dataset before building a regression model.
        </p>
      </GlassCard>

      {/* UPLOAD */}
      <GlassCard>
        <input
          type="file"
          accept=".csv"
          onChange={e => e.target.files && handleUpload(e.target.files[0])}
        />

        {loading && <p className="text-muted">Analyzing dataset…</p>}
        {error && <p className="text-error">{error}</p>}
      </GlassCard>

      {/* CONTENT */}
      {eda && (
        <>
          <DatasetOverview eda={eda} />
          <NumericSummary eda={eda} />
          <CorrelationHeatmap eda={eda} />
          <HistogramChart eda={eda} />
          <ScatterPlot eda={eda} />
          <HeadTailTable eda={eda} />

          {/* CTA */}
          <GlassCard>
            <h3>Ready to build a regression model?</h3>
            <button
              style={{ marginTop: 12 }}
              onClick={() => navigate("/regression")}
            >
              Continue to Regression →
            </button>
          </GlassCard>
        </>
      )}
    </div>
  );
}
