import { useNavigate } from "react-router-dom";
import GlassCard from "../components/common/GlassCard";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Regression Visualization</div>
          <h1>Turn CSV data into clear regression insights in minutes.</h1>
          <p className="text-secondary">
            Upload a CSV, explore EDA, pick features + target, and run regression.
            Get instant plots, model comparison, and exportable results.
          </p>
          <div className="cta-row">
            <button className="btn-primary" onClick={() => navigate("/eda")}>
              Start with EDA
            </button>
            <button className="btn-secondary" onClick={() => navigate("/regression")}>
              Skip to Regression
            </button>
          </div>
          <p className="cta-helper text-secondary">
            Recommended flow: EDA → Regression for cleaner models and better plots.
          </p>
          <div className="pill-row">
            <span className="pill">CSV In</span>
            <span className="pill">EDA Insights</span>
            <span className="pill">Model Comparison</span>
            <span className="pill">Plot + PDF</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <h3>What You Get</h3>
            <ul className="simple-list">
              <li>Cleaned data pipeline (numeric + categorical)</li>
              <li>Multiple regression models compared automatically</li>
              <li>Actual vs Predicted plot for train and test</li>
              <li>Exported model file and PDF report</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section">
        <h2>How To Use</h2>
        <div className="step-grid">
          <GlassCard>
            <div className="step-number">1</div>
            <h3>Upload CSV</h3>
            <p className="text-secondary">
              Pick a CSV with headers, a numeric target column, and several
              feature columns. Larger files work fine.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="step-number">2</div>
            <h3>Review EDA</h3>
            <p className="text-secondary">
              Check summary stats, correlations, histograms, and scatter plots
              to spot patterns and outliers early.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="step-number">3</div>
            <h3>Run Regression</h3>
            <p className="text-secondary">
              Choose target + features, select how to handle nulls, and run
              regression. The best model is selected automatically.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="step-number">4</div>
            <h3>Export Results</h3>
            <p className="text-secondary">
              Review the plot, download the model file, and export a PDF report.
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="section">
        <h2>Prerequisites</h2>
        <div className="card-grid">
          <div className="info-card">
            <h3>CSV File</h3>
            <p className="text-secondary">
              Use a valid `.csv` file with header rows.
            </p>
          </div>
          <div className="info-card">
            <h3>Numeric Target</h3>
            <p className="text-secondary">
              The target column must be numeric for regression.
            </p>
          </div>
          <div className="info-card">
            <h3>Enough Rows</h3>
            <p className="text-secondary">
              Include enough rows for a reliable train/test split.
            </p>
          </div>
          <div className="info-card">
            <h3>Clean Missing Values</h3>
            <p className="text-secondary">
              Choose auto-clean to fill numeric by mean and categorical by mode.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>What Is Regression?</h2>
        <p className="text-secondary">
          Regression models the relationship between input features (X) and a
          numeric target (y). This app compares multiple models and picks the
          best one based on test performance.
        </p>
      </section>
    </div>
  );
}
