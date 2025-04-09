import { useTranslation } from "react-i18next";
import useAppStore from "../stores/appStore";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

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
  const { toggleTheme } = useAppStore();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-amber-600" onClick={toggleTheme}>
        {t("hello")}
      </h1>{" "}
      <button onClick={() => openSettingsWindow("Settings")}>打开设置</button>
    </div>
  );
};

export default App;
