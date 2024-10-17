import { Game } from '@/types/Game';
import { create } from 'zustand';
import { Steam } from '@/backend-command/command';

export const useGameLibraryStore = create<{
	gameLibrary: Array<Game>;
}>((set) => ({
	gameLibrary: [],
}));

export const refresh = async () => {
	const gameLibrary = await Steam.library.list();
	console.log(gameLibrary);
	useGameLibraryStore.setState({ gameLibrary: gameLibrary });
};