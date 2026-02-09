import GlassCard from "../common/GlassCard";

export default function NullStrategySelector({
  value,
  onChange
}: {
  value: "drop" | "mean" | "auto";
  onChange: (v: "drop" | "mean" | "auto") => void;
}) {
  return (
    <GlassCard>
      <h2>Null Strategy</h2>
      <label>
        <input
          type="radio"
          checked={value === "auto"}
          onChange={() => onChange("auto")}
        />
        Auto (mean + mode)
      </label>
      <label>
        <input
          type="radio"
          checked={value === "drop"}
          onChange={() => onChange("drop")}
        />
        Drop rows
      </label>
      <label style={{ marginLeft: 16 }}>
        <input
          type="radio"
          checked={value === "mean"}
          onChange={() => onChange("mean")}
        />
        Mean imputation
      </label>
    </GlassCard>
  );
}
