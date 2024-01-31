import { z } from "zod";

export interface Game {
	id: string;
	name: string;
	cover: string;
	platform: string;
}

export const Game = z.object({
	id: z.string(),
	name: z.string(),
	cover: z.string(),
	platform: z.string(),
});

export const DefaultGame = () => ({
	id: '',
	name: '',
	cover: '',
	platform: '',
});