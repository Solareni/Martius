import { Theme } from "@radix-ui/themes";
import useAppStore from "./stores/appStore";
import App from "./pages/App";
import Settings from "./pages/Settings";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
};

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/settings/*",
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
            window.location.search.includes("window=settings")
              ? "/settings"
              : "/"
          }
          replace
        />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
