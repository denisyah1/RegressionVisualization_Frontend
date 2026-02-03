import FluidGlass from "../plugins/glass/FluidGlass";

export default function SectionGlass({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ position: "relative", height: "600px" }}>
      {/* GLASS LAYER */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none" // ⛔ jangan ganggu UI
        }}
      >
        <FluidGlass
          mode="bar"
          barProps={{
            scale: 0.15,
            ior: 1.15,
            thickness: 10,
            transmission: 1,
            roughness: 0,
            chromaticAberration: 0.1,
            anisotropy: 0.01
          }}
        />
      </div>

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1
        }}
      >
        {children}
      </div>
    </div>
  );
}
