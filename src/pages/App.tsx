import { useTranslation } from "react-i18next";
import useAppStore from "../stores/appStore";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Avatar, Box, Flex } from "@radix-ui/themes";
import { LuSun, LuMoon, LuSettings } from "react-icons/lu";
import { Outlet } from "react-router-dom";

const openSettingsWindow = async (title: string) => {
	// 检查窗口是否已存在
	const webview = await WebviewWindow.getByLabel("settings");

	if (webview) {
		// 如果窗口已存在，可以调用focus方法使其获得焦点
		webview.setFocus();
	} else {
		// 创建新窗口
		const secondWindow = new WebviewWindow("settings", {
			url: "index.html?window=settings",
			title,
			x: 100,
			y: 100,
			width: 800,
			height: 600,
		});

		// 等待窗口加载完成
		secondWindow.once("tauri://created", () => {
			console.log("窗口已创建");
		});

		secondWindow.once("tauri://error", (e) => {
			console.error("窗口创建错误:", e);
		});
	}
};

const App = () => {
	const { t } = useTranslation();
	const { toggleTheme, theme } = useAppStore();
	const LuTheme = theme === "light" ? LuSun : LuMoon;

	return (
		<Flex direction="row" height="100vh" className="overflow-hidden">
			<Flex direction="column" align="start" justify="between" className="p-4">
				<Box className="cursor-pointer">
					<Avatar fallback="A" radius="full" />
				</Box>
				<Flex direction="column" gap="5">
					<LuTheme
						className="cursor-pointer w-4 h-4 hover:text-amber-900"
						onClick={toggleTheme}
					/>
					<LuSettings
						className="cursor-pointer w-4 h-4 hover:text-amber-900"
						onClick={() => openSettingsWindow(t("settings"))}
					/>
				</Flex>
			</Flex>

			<Box className="flex-1">
				<Outlet />
			</Box>
		</Flex>
	);
};

export default App;
