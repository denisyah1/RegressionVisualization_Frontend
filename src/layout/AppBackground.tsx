import ColorBends from "../plugins/background/ColorBends.tsx";

export default function AppBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none" // ⛔ background tidak ganggu UI
      }}
    >
      <ColorBends
        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.08}
        transparent
      />
    </div>
  );
}
