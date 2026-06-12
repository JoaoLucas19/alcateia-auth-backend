export declare function createProduct(data: {
    name: string;
    description?: string;
}): Promise<any>;
export declare function listProducts(): Promise<any>;
export declare function getProduct(id: string): Promise<any>;
export declare function updateProduct(id: string, data: {
    name?: string;
    description?: string;
    isActive?: boolean;
}): Promise<any>;
export declare function deleteProduct(id: string): Promise<any>;
