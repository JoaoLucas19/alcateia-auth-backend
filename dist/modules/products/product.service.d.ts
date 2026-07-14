export declare function createProduct(data: {
    name: string;
    description?: string;
}): Promise<{
    id: string;
    name: string;
    createdAt: Date;
    description: string | null;
    isActive: boolean;
}>;
export declare function listProducts(): Promise<({
    _count: {
        keys: number;
    };
} & {
    id: string;
    name: string;
    createdAt: Date;
    description: string | null;
    isActive: boolean;
})[]>;
export declare function getProduct(id: string): Promise<{
    keys: undefined;
    stats: Record<string, number>;
    _count: {
        keys: number;
    };
    id: string;
    name: string;
    createdAt: Date;
    description: string | null;
    isActive: boolean;
}>;
export declare function updateProduct(id: string, data: {
    name?: string;
    description?: string;
    isActive?: boolean;
}): Promise<{
    id: string;
    name: string;
    createdAt: Date;
    description: string | null;
    isActive: boolean;
}>;
export declare function deleteProduct(id: string): Promise<{
    id: string;
    name: string;
    createdAt: Date;
    description: string | null;
    isActive: boolean;
}>;
