import { z } from "zod";

export const GameSave = z.object({
	gameId: z.string(),
	time: z.string(),
	screenshot: z.string(),
	description: z.string(),
});

export type GameSave = z.infer<typeof GameSave>;