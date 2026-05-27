import { z } from "zod";
export declare const banHwidSchema: z.ZodObject<{
    hwid: z.ZodString;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const unbanHwidByValueSchema: z.ZodObject<{
    hwid: z.ZodString;
}, z.core.$strip>;
