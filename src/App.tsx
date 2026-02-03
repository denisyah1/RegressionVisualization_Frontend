import AppBackground from "./layout/AppBackground";

export default function App() {
  return (
    <>
      <AppBackground />

      {/* CONTENT LAYER */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh"
        }}
      >
        {/* nanti: router / pages */}
      </div>
    </>
  );
}
