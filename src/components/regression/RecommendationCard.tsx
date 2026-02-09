import GlassCard from "../common/GlassCard";
import { useDatasetStore } from "../../store/useDatasetStore";
import { useRegressionStore } from "../../store/useRegressionStore";
import { getRecommendation } from "../../api/recommendation.api";
import { useEffect, useState } from "react";
import type { RecommendationResponse } from "../../types/recommendation";

export default function RecommendationCard() {
  const { file } = useDatasetStore();
  const { setTarget, setFeatures } = useRegressionStore();

  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return;

    setLoading(true);
    getRecommendation(file)
      .then(setData)
      .finally(() => setLoading(false));
  }, [file]);

  if (!file) return null;

  return (
    <GlassCard>
      <h2>Recommended Regression Setup</h2>

      {loading && <p className="text-muted">Analyzing dataset…</p>}

      {!loading && data && (
        <>
          <p className="text-muted">
            Based on correlation, null ratio, and feature quality.
          </p>

          <div style={{ marginTop: 12 }}>
            <strong>Target:</strong>{" "}
            <span style={{ color: "#7dd3fc" }}>
              {data.default_selection.target}
            </span>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong>Features:</strong>{" "}
            {data.default_selection.features.join(", ")}
          </div>

          <button
            style={{ marginTop: 16 }}
            onClick={() => {
              setTarget(data.default_selection.target ?? "");
              setFeatures(data.default_selection.features);
            }}
          >
            Apply Recommendation
          </button>
        </>
      )}
    </GlassCard>
  );
}
