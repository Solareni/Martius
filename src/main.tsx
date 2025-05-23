import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router";
import "./i18n"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
