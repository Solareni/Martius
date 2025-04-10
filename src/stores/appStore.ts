import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { emit, listen } from "@tauri-apps/api/event";

interface AppStore {
	theme: "light" | "dark";
	language: string;
	setTheme: (theme: "light" | "dark") => void;
	setLanguage: (language: string) => void;
	toggleTheme: () => void;
	listenThemeChange: () => Promise<void>;
}

const useAppStore = create<AppStore>()(
	persist(
		(set, get) => ({
			theme: "light",
			language: "en",
			setTheme: async (theme) => {
				await emit("theme-change", { theme });
			},
			setLanguage: (language) => set({ language }),
			toggleTheme: async () => {
				const newTheme = get().theme === "light" ? "dark" : "light";
				await emit("theme-change", { theme: newTheme });
			},
			listenThemeChange: async () => {
				await listen("theme-change", (event) => {
					const { theme } = event.payload as { theme: "light" | "dark" };
					set({ theme });
				});
			},
		}),
		{
			name: "app-store",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({ theme: state.theme, language: state.language }),
		}
	)
);

export default useAppStore;
