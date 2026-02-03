import type { ReactNode } from "react";

export default function GlassCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="glass"
      style={{
        padding: "24px"
      }}
    >
      {children}
    </div>
  );
}
