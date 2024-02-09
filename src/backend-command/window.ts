import { appWindow } from "@tauri-apps/api/window";

export const Window = {
	minimize: async () => {
		await appWindow.minimize();
	},
	maximize: async () => {
		await appWindow.maximize();
	},
	unmaximize: async () => {
		await appWindow.unmaximize();
	},
	close: async () => {
		await appWindow.close();
	},
};