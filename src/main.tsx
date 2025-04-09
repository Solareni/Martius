import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import useAppStore from "./appStore";
import Settings from "./Settings";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
const ThemeApp = () => {
  const { theme } = useAppStore();
  return (
    <Theme appearance={theme}>
      <App />
    </Theme>
  );
};
const ThemeSettings = () => {
  const { theme } = useAppStore();
  return (
    <Theme appearance={theme}>
      <Settings />
    </Theme>
  );
}

const router = createBrowserRouter([
  {
    path: "/settings",
    element: <ThemeSettings />,
  },
  {
    path: "/",
    element: <ThemeApp />,
  },
  {
		path: "*",
		element: (
			<Navigate
				to={
					window.location.search.includes("window=settings") ? "/settings" : "/"
				}
				replace
			/>
		),
	},
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
