import { z } from "zod";

export const Game = z.object({
	id: z.string(),
	name: z.string(),
	cover: z.string().or(z.null()),
	header: z.string().or(z.null()),
	platform: z.string(),
});

export type Game = z.infer<typeof Game>;

export const DefaultGame = () => ({
	id: '',
	name: '',
	cover: '',
	platform: '',
});