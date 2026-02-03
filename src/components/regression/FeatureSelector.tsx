import GlassCard from "../common/GlassCard";

export default function FeatureSelector({
  numericColumns,
  categoricalColumns,
  value,
  onChange
}: {
  numericColumns: string[];
  categoricalColumns: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (col: string) => {
    onChange(
      value.includes(col)
        ? value.filter(v => v !== col)
        : [...value, col]
    );
  };

  return (
    <GlassCard>
      <h2>Features</h2>

      {[...numericColumns, ...categoricalColumns].map(c => (
        <label key={c} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={value.includes(c)}
            onChange={() => toggle(c)}
          />
          {c}
        </label>
      ))}
    </GlassCard>
  );
}
