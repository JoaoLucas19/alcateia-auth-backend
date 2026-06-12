import { z } from "zod";
export declare const adminUsernameSchema: z.ZodString;
export declare const adminPasswordSchema: z.ZodString;
export declare const adminLoginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const clientUsernameSchema: z.ZodString;
export declare const clientPasswordSchema: z.ZodString;
export declare const clientLoginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    hwid: z.ZodOptional<z.ZodString>;
    ipAddress: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const clientRegisterSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    license: z.ZodString;
    hwid: z.ZodOptional<z.ZodString>;
    ipAddress: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
