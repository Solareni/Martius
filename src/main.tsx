import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router";
import "./locales/i18n"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
