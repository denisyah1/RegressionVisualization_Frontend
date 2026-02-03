import GlassCard from "../common/GlassCard";

export default function TargetSelector({
  numericColumns,
  value,
  onChange
}: {
  numericColumns: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <GlassCard>
      <h2>Target Variable</h2>
      <select value={value} onChange={e => onChange(e.target.value)}>
        <option value="">Select target</option>
        {numericColumns.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </GlassCard>
  );
}
