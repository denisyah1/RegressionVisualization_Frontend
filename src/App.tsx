import AppBackground from "./layout/AppBackground";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <>
      <AppBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh"
        }}
      >
        <AppRouter />
      </div>
    </>
  );
}
