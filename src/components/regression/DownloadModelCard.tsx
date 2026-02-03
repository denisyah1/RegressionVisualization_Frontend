import GlassCard from "../common/GlassCard";
import { downloadModel } from "../../api/model.api";

export default function DownloadModelCard({
  filename
}: {
  filename: string;
}) {
  return (
    <GlassCard>
      <h3>Download Trained Model</h3>

      <p className="text-muted">
        Your best-performing regression model is ready.
      </p>

      <button
        onClick={() => downloadModel(filename)}
        style={{
          marginTop: 12,
          padding: "10px 16px",
          borderRadius: 10,
          background: "rgba(125, 211, 252, 0.2)",
          border: "1px solid rgba(125, 211, 252, 0.4)",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Download Model (.pkl)
      </button>
    </GlassCard>
  );
}
