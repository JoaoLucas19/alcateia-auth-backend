export declare const productRepository: {
    create: (data: {
        name: string;
        description?: string;
    }) => any;
    findAll: () => any;
    findById: (id: string) => any;
    update: (id: string, data: {
        name?: string;
        description?: string;
        isActive?: boolean;
    }) => any;
    delete: (id: string) => any;
    hasKeys: (id: string) => Promise<boolean>;
};
