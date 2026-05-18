export declare function generateKeyValue(): string;
export declare function generateUniqueKeys(quantity: number, existingChecker: (key: string) => Promise<boolean>): Promise<string[]>;
