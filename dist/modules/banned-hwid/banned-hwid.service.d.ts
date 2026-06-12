export declare function isHwidBanned(hwid: string): Promise<boolean>;
export declare function listBannedHwids(filters: {
    page: number;
    limit: number;
    search?: string;
}): Promise<{
    total: any;
    items: any;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function banHwid(hwid: string, reason?: string): Promise<{
    message: string;
    data: any;
}>;
export declare function unbanHwidById(id: string): Promise<{
    message: string;
}>;
export declare function unbanHwidByValue(hwid: string): Promise<{
    message: string;
}>;
