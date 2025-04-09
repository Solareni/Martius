import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {
	theme: "light" | "dark";
	language: string;
	setTheme: (theme: "light" | "dark") => void;
	setLanguage: (language: string) => void;
	toggleTheme: () => void;
}

const useAppStore = create<AppStore>()(
	persist(
		(set) => ({
			theme: "light",
			language: "en",
			setTheme: (theme) => set({ theme }),
			setLanguage: (language) => set({ language }),
			toggleTheme: () =>
				set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
		}),
		{
			name: "app-store",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({ theme: state.theme, language: state.language }),
		}
	)
);

export default useAppStore;
