import { Game } from "@/types/Game";
import { invoke } from "@tauri-apps/api";

const STEAM_COMMAND_PREFIX = "plugin:steam_library|";

const steamLibraryCommand = (command: string) => {
	// return `${STEAM_COMMAND_PREFIX}${command}`;
	return command;
};

export const Steam = {
	library: {
		list: async (): Promise<Array<Game>> => {
			return await invoke(steamLibraryCommand('get_game_list'));
		},
	},
	game: {
		fetch: async (gameId: string) => {
			return await invoke(steamLibraryCommand('fetch_game'), { gameId });
		},
		fetchCover: async (gameId: string) => {
			return await invoke(steamLibraryCommand('fetch_game_cover'), { gameId });
		},
		fetchIcon: async (gameId: string) => {
			return await invoke(steamLibraryCommand('fetch_game_icon'), { gameId });
		},
		fetchLogo: async (gameId: string) => {
			return await invoke(steamLibraryCommand('fetch_game_logo'), { gameId });
		},
		fetchHeader: async (gameId: string) => {
			return await invoke(steamLibraryCommand('fetch_game_header'), { gameId });
		},
	},
};

const Game_SAVE_COMMAND_PREFIX = "plugin:game_save|";
const gameSaveCommand = (command: string) => {
	// return `${Game_SAVE_COMMAND_PREFIX}${command}`;
	return command;
};

export const GameSave = {
	list: async (gameId: string) => {
		return await invoke(gameSaveCommand('get_game_save_list'), { gameId });
	},
	backup: async (gameId: string) => {
		return await invoke(gameSaveCommand('backup_game'), { gameId });
	},
	rewind: async (gameId: string, saveId: string) => {
		return await invoke(gameSaveCommand('rewind_game'), { gameId, saveId });
	},
	delete: async (gameId: string, saveId: string) => {
		return await invoke(gameSaveCommand('delete_game_save'), { gameId, saveId });
	},
	export: async (gameId: string, saveId: string) => {
		return await invoke(gameSaveCommand('export_game_save'), { gameId, saveId });
	},
};
