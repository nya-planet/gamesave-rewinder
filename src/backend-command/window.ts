import { getCurrentWindow } from "@tauri-apps/api/window";

export const Window = {
	minimize: async () => {
		await getCurrentWindow().minimize();
	},
	maximize: async () => {
		await getCurrentWindow().maximize();
	},
	unmaximize: async () => {
		await getCurrentWindow().unmaximize();
	},
	close: async () => {
		await getCurrentWindow().close();
	},
};