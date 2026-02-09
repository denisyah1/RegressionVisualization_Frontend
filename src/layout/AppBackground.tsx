import ColorBends from "../plugins/background/ColorBends";

export default function AppBackground() {
  return (
    <>
      {/* Shader background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2
        }}
      >
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          speed={0.15}
          noise={0.05}
          parallax={0.4}
        />
      </div>

      {/* FADE / BLUR OVERLAY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(circle at top, rgba(5,5,8,0.6), rgba(5,5,8,0.9))",
          backdropFilter: "blur(6px)"
        }}
      />
    </>
  );
}
