import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";   // reset + theme
import "./base.css";    // typography + utilities
import "./App.css";     // layout

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
