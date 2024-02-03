import { z } from "zod";

export const Game = z.object({
	id: z.string(),
	name: z.string(),
	cover: z.string(),
	platform: z.string(),
});

export type Game = z.infer<typeof Game>;

export const DefaultGame = () => ({
	id: '',
	name: '',
	cover: '',
	platform: '',
});