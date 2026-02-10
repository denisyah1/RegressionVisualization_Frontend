import { useNavigate } from "react-router-dom";
import GlassCard from "../components/common/GlassCard";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Regression Visualization</div>
          <h1>Understand your data, then build a clean regression model.</h1>
          <p className="text-secondary">
            Upload a CSV, explore EDA, choose features and target, run regression,
            and get an instant plot plus a downloadable model and report.
          </p>
          <div className="cta-row">
            <button className="btn-primary" onClick={() => navigate("/eda")}>
              Start With EDA
            </button>
            <button onClick={() => navigate("/regression")}>
              Go to Regression
            </button>
          </div>
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
              Choose a CSV file with a numeric target column and at least a few
              features. Larger CSVs are supported.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="step-number">2</div>
            <h3>Review EDA</h3>
            <p className="text-secondary">
              Explore summary statistics, correlations, histograms, and scatter
              plots to understand your data.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="step-number">3</div>
            <h3>Run Regression</h3>
            <p className="text-secondary">
              Pick target + features, choose null handling, then run regression.
              The best model is selected automatically.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="step-number">4</div>
            <h3>Export Results</h3>
            <p className="text-secondary">
              View the plot, download the model, and export a PDF report.
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
              Must be a valid `.csv` file with headers.
            </p>
          </div>
          <div className="info-card">
            <h3>Numeric Target</h3>
            <p className="text-secondary">
              Regression requires the target column to be numeric.
            </p>
          </div>
          <div className="info-card">
            <h3>Enough Rows</h3>
            <p className="text-secondary">
              Make sure you have enough rows for train and test split.
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
          Regression is a supervised learning method that models the relationship
          between input features (X) and a numeric target (y). The goal is to
          predict y as accurately as possible for new data. This app compares
          multiple regression models and selects the best one based on test
          performance.
        </p>
      </section>
    </div>
  );
}
