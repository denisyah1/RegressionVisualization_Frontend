export default function GlassCard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 16,
        padding: 24,
        backdropFilter: "blur(14px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.35)"
      }}
    >
      {children}
    </div>
  );
}
