import { z } from "zod";

export const banHwidSchema = z.object({
  hwid: z.string().min(1, "HWID obrigatório").max(256),
  reason: z.string().max(500).optional(),
});

export const unbanHwidByValueSchema = z.object({
  hwid: z.string().min(1).max(256),
});
