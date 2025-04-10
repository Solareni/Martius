import { Theme } from "@radix-ui/themes";
import useAppStore from "./stores/appStore";
import App from "./pages/App";
import Settings from "./pages/Settings";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";

const Router = () => {
	const { theme } = useAppStore();
	useEffect(() => {
		useAppStore.getState().listenThemeChange();
	});
	const router = createBrowserRouter([
		{
			path: "/settings/*",
			element: <Settings />,
		},
		{
			path: "/",
			element: <App />,
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
	return (
		<Theme appearance={theme}>
			<RouterProvider router={router} />
		</Theme>
	);
};

export default Router;
