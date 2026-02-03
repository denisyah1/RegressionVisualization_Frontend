import { useState } from "react";
import { runEda } from "../api/eda.api";
import type { EdaResponse } from "../types/eda";

import GlassCard from "../components/common/GlassCard";
import CorrelationHeatmap from "../components/eda/CorrelationHeatmap";
import DatasetOverview from "../components/eda/DatasetOverview";
import HeadTailTable from "../components/eda/HeadTailTable";
import HistogramChart from "../components/eda/HistogramChart";
import NumericSummary from "../components/eda/NumericSummary";
import ScatterPlot from "../components/eda/Scatterplot";



export default function EdaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [eda, setEda] = useState<EdaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (f: File) => {
    setFile(f);
    setLoading(true);
    setError(null);

    try {
      const result = await runEda(f);
      setEda(result);
    } catch (e) {
      setError("Failed to analyze CSV");
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
        {loading && <p className="text-muted">Analyzing CSV…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </GlassCard>

      {/* DATASET OVERVIEW */}
      {eda && <DatasetOverview eda={eda} />}

      {/* NUMERIC SUMMARY */}
      {eda && <NumericSummary eda={eda} />}

      {/* CORRELATION HEATMAP */}
      {eda && <CorrelationHeatmap eda={eda} />}

      {/* HISTOGRAM */}
      {eda && <HistogramChart eda={eda} />}

      {/* SCATTER PLOT */}
      {eda && <ScatterPlot eda={eda} />}

      {/* HEAD / TAIL */}
      {eda && <HeadTailTable eda={eda} />}

      {/* CTA */}
      {eda && (
        <GlassCard>
          <h3>Ready to build a regression model?</h3>
          <button disabled style={{ marginTop: 12 }}>
            Continue to Regression →
          </button>
        </GlassCard>
      )}
    </div>
  );
}
