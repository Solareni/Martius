import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import useAppStore from "./appStore";
const ThemeApp = () => {
  const { theme } = useAppStore();
  return (
    <Theme appearance={theme}>
      <App />
    </Theme>
  );
};
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeApp />
  </React.StrictMode>
);
